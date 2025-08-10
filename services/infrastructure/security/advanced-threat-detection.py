#!/usr/bin/env python3
"""
XORB Advanced Threat Detection System
ML-powered threat detection with behavioral analysis and automated response
"""

import asyncio
import logging
import json
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass, asdict
from enum import Enum
import hashlib
import sqlite3
import pickle
from pathlib import Path
import aiohttp
import redis.asyncio as redis

# Machine Learning imports
try:
    from sklearn.ensemble import IsolationForest, RandomForestClassifier
    from sklearn.preprocessing import StandardScaler
    from sklearn.decomposition import PCA
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    logging.warning("ML libraries not available, using rule-based detection only")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ThreatLevel(Enum):
    """Threat severity levels"""
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4

class ThreatCategory(Enum):
    """Types of threats"""
    MALWARE = "malware"
    INTRUSION = "intrusion"
    DATA_EXFILTRATION = "data_exfiltration"
    ANOMALOUS_BEHAVIOR = "anomalous_behavior"
    PRIVILEGE_ESCALATION = "privilege_escalation"
    LATERAL_MOVEMENT = "lateral_movement"
    COMMAND_INJECTION = "command_injection"
    UNKNOWN = "unknown"

@dataclass
class ThreatEvent:
    """Detected threat event"""
    event_id: str
    timestamp: datetime
    source_ip: str
    target_ip: str
    threat_level: ThreatLevel
    category: ThreatCategory
    description: str
    indicators: List[str]
    confidence: float
    raw_data: Dict[str, Any]
    automated_response: bool = False
    
    def to_dict(self) -> Dict:
        data = asdict(self)
        data['timestamp'] = self.timestamp.isoformat()
        data['threat_level'] = self.threat_level.value
        data['category'] = self.category.value
        return data

class BehavioralAnalyzer:
    """Advanced behavioral analysis engine"""
    
    def __init__(self):
        self.user_profiles: Dict[str, Dict] = {}
        self.baseline_models: Dict[str, Any] = {}
        self.anomaly_detectors: Dict[str, Any] = {}
        self.feature_scalers: Dict[str, Any] = {}
        
    def analyze_user_behavior(self, user_id: str, activity_data: List[Dict]) -> Tuple[float, List[str]]:
        """Analyze user behavior for anomalies"""
        if not ML_AVAILABLE:
            return self._rule_based_behavioral_analysis(user_id, activity_data)
        
        try:
            # Extract features from activity data
            features = self._extract_behavioral_features(activity_data)
            
            # Get or create user profile
            if user_id not in self.user_profiles:
                self._create_user_profile(user_id, features)
                return 0.1, []  # New user, low anomaly score
            
            # Detect anomalies
            anomaly_score = self._detect_behavioral_anomalies(user_id, features)
            anomalous_activities = self._identify_anomalous_activities(user_id, activity_data, features)
            
            # Update user profile
            self._update_user_profile(user_id, features)
            
            return anomaly_score, anomalous_activities
            
        except Exception as e:
            logger.error(f"Behavioral analysis error: {e}")
            return 0.0, []

class AdvancedThreatDetector:
    """Advanced threat detection system with ML capabilities"""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis_client = None
        self.redis_url = redis_url
        self.threat_indicators: Dict[str, Any] = {}
        self.active_threats: Dict[str, ThreatEvent] = {}
        self.behavioral_analyzer = BehavioralAnalyzer()
        self.detection_rules: List[Dict] = []
        self.ml_models: Dict[str, Any] = {}
        
        # Setup database
        self.db_path = Path("threat_detection.db")
        self._init_database()
    
    async def initialize(self):
        """Initialize threat detection system"""
        try:
            self.redis_client = redis.from_url(self.redis_url)
            await self.redis_client.ping()
            
            # Load detection rules
            await self._load_detection_rules()
            
            # Initialize ML models
            if ML_AVAILABLE:
                await self._initialize_ml_models()
            
            # Load threat intelligence
            await self._update_threat_intelligence()
            
            logger.info("Advanced Threat Detection System initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize threat detector: {e}")
            raise
    
    async def analyze_network_traffic(self, traffic_data: List[Dict]) -> List[ThreatEvent]:
        """Analyze network traffic for threats"""
        detected_threats = []
        
        try:
            for packet in traffic_data:
                # Check against threat indicators
                source_ip = packet.get('source_ip', '')
                dest_ip = packet.get('dest_ip', '')
                
                # Apply detection rules to all traffic
                rule_threats = await self._apply_detection_rules([packet])
                detected_threats.extend(rule_threats)
            
            # Store detected threats
            for threat in detected_threats:
                await self._store_threat_event(threat)
                self.active_threats[threat.event_id] = threat
            
            return detected_threats
            
        except Exception as e:
            logger.error(f"Network traffic analysis error: {e}")
            return []

async def main():
    """Main function for testing threat detection system"""
    detector = AdvancedThreatDetector()
    await detector.initialize()
    
    # Example network traffic analysis
    sample_traffic = [
        {
            "timestamp": datetime.utcnow().isoformat(),
            "source_ip": "192.168.1.100",
            "dest_ip": "10.0.0.5",
            "port": 443,
            "protocol": "tcp",
            "bytes_transferred": 1500
        }
    ]
    
    threats = await detector.analyze_network_traffic(sample_traffic)
    print(f"Detected {len(threats)} threats from network traffic")

if __name__ == "__main__":
    asyncio.run(main())