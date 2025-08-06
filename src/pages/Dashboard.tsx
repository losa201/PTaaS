import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  User, 
  Shield, 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardSidebar from '@/components/DashboardSidebar';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for charts
  const vulnerabilityData = [
    { date: 'Jan', critical: 8, high: 12, medium: 15, low: 18 },
    { date: 'Feb', critical: 10, high: 14, medium: 12, low: 16 },
    { date: 'Mar', critical: 6, high: 11, medium: 18, low: 14 },
    { date: 'Apr', critical: 12, high: 16, medium: 14, low: 12 },
    { date: 'May', critical: 9, high: 13, medium: 16, low: 15 },
    { date: 'Jun', critical: 7, high: 10, medium: 13, low: 17 }
  ];

  const scanActivity = [
    { id: 1, message: 'Scan completed for example.com', time: '2 min ago', type: 'completed' },
    { id: 2, message: 'Started scan for example.com', time: '5 min ago', type: 'started' },
    { id: 3, message: 'Critical vulnerability found in webapp.corp.com', time: '12 min ago', type: 'critical' },
    { id: 4, message: 'Compliance check passed for api.example.com', time: '15 min ago', type: 'compliance' }
  ];

  const recentReports = [
    { id: 1, domain: 'example.com', date: 'Aug 3, 2023', status: 'completed' },
    { id: 2, domain: 'example.com', date: 'July 24, 2023', status: 'completed' },
    { id: 3, domain: 'webapp.corp.com', date: 'July 20, 2023', status: 'completed' },
    { id: 4, domain: 'api.example.com', date: 'July 18, 2023', status: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-cyber text-xl font-bold text-neon-glow">VerteiDiq</span>
            </div>
            
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* High-Level Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Critical Vulnerabilities */}
            <Card className="card-cyber border-destructive/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Critical Vulnerabilities</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-3xl font-bold text-destructive">12</span>
                      <Badge variant="destructive" className="animate-pulse">Running...</Badge>
                    </div>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            {/* Compliance Score */}
            <Card className="card-cyber">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-3xl font-bold text-foreground">84%</span>
                      <Badge variant="outline" className="text-accent border-accent">+3.5%</Badge>
                    </div>
                  </div>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="2"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeDasharray="84, 100"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assets Monitored */}
            <Card className="card-cyber">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Assets Monitored</p>
                    <span className="text-3xl font-bold text-foreground mt-2 block">1,250</span>
                  </div>
                  <Activity className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Last Scan */}
            <Card className="card-cyber">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Scan</p>
                    <span className="text-3xl font-bold text-foreground mt-2 block">2h ago</span>
                  </div>
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Scan Feed */}
            <Card className="card-cyber">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Live Scan Feed</span>
                  <Badge variant="outline" className="ml-auto">
                    Scanning<span className="animate-pulse">...</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scanActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'completed' ? 'bg-accent' :
                        activity.type === 'critical' ? 'bg-destructive' :
                        activity.type === 'compliance' ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="card-cyber">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Recent Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                      <div>
                        <p className="font-medium text-foreground">{report.domain}</p>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vulnerabilities Chart */}
          <Card className="card-cyber">
            <CardHeader>
              <CardTitle>Vulnerabilities Over Time</CardTitle>
              <CardDescription>Tracking vulnerability trends across severity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={vulnerabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line type="monotone" dataKey="critical" stroke="hsl(var(--destructive))" strokeWidth={2} />
                    <Line type="monotone" dataKey="high" stroke="hsl(var(--accent))" strokeWidth={2} />
                    <Line type="monotone" dataKey="medium" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="low" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Breakdown */}
          <Card className="card-cyber">
            <CardHeader>
              <CardTitle>Compliance Breakdown</CardTitle>
              <CardDescription>Track compliance across different frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gdpr" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="gdpr">GDPR</TabsTrigger>
                  <TabsTrigger value="nis2">NIS2</TabsTrigger>
                  <TabsTrigger value="tisax">TISAX</TabsTrigger>
                  <TabsTrigger value="kritis">KRITIS</TabsTrigger>
                </TabsList>
                <TabsContent value="gdpr" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Delta Progress</span>
                        <span className="text-sm text-accent">+4%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                        <p className="text-2xl font-bold text-foreground">94%</p>
                        <p className="text-sm text-muted-foreground">Data Protection</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                        <p className="text-2xl font-bold text-foreground">82%</p>
                        <p className="text-sm text-muted-foreground">Access Controls</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="nis2" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">NIS2 Compliance</span>
                        <span className="text-sm text-primary">+2%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="tisax" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">TISAX Level</span>
                        <span className="text-sm text-cyber-violet">AL2</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="kritis" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">KRITIS Standards</span>
                        <span className="text-sm text-accent">+1%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;