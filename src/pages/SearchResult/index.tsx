import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, Tag, List, Typography, Spin, Empty } from 'antd';
import { ArrowLeftOutlined, FileTextOutlined, ThunderboltOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import PolicyGraph from '../../components/PolicyGraph';

const { Title, Paragraph, Text } = Typography;

interface SearchStrategy {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

interface PolicyDocument {
  id: string;
  title: string;
  department: string;
  date: string;
  type: string;
  abstract: string;
}

const SearchResult: React.FC = () => {
  const location = useLocation();
  const { keyword, filters } = location.state as any;
  const [loading, setLoading] = useState(true);
  const [searchStrategies, setSearchStrategies] = useState<SearchStrategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [policyResults, setPolicyResults] = useState<PolicyDocument[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 生成搜索策略
  useEffect(() => {
    // 模拟API调用
    setTimeout(() => {
      const strategies = generateSearchStrategies(keyword);
      setSearchStrategies(strategies);
      setLoading(false);
    }, 1000);
  }, [keyword]);

  // 生成搜索策略的函数
  const generateSearchStrategies = (keyword: string): SearchStrategy[] => {
    return [
      {
        id: '1',
        title: '核心政策文件',
        description: `搜索与"${keyword}"直接相关的中央和地方重要政策文件，包括规划、意见、办法等。`,
        tags: ['重要政策', '核心文件', '直接相关']
      },
      {
        id: '2',
        title: '配套措施分析',
        description: `查找"${keyword}"相关的配套政策、实施细则和补充通知，全面了解政策实施方案。`,
        tags: ['配套政策', '实施细则', '操作指南']
      },
      {
        id: '3',
        title: '政策解读追踪',
        description: `收集各部门对"${keyword}"政策的解读文件，了解政策要点和实施重点。`,
        tags: ['政策解读', '部门说明', '要点分析']
      },
      {
        id: '4',
        title: '历史政策演变',
        description: `追踪"${keyword}"相关政策的历史变化，分析政策调整和优化方向。`,
        tags: ['政策演变', '历史追踪', '趋势分析']
      }
    ];
  };

  // 模拟获取政策文件
  const fetchPolicyDocuments = async (strategyId: string) => {
    setResultsLoading(true);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResults: PolicyDocument[] = [
      {
        id: '1',
        title: `关于促进${keyword}发展的指导意见`,
        department: '国务院办公厅',
        date: '2023-12-01',
        type: '指导意见',
        abstract: `为深入贯彻落实党中央、国务院决策部署，进一步促进${keyword}高质量发展，提出以下意见...`
      },
      {
        id: '2',
        title: `${keyword}产业发展"十四五"规划`,
        department: '发展改革委',
        date: '2023-10-15',
        type: '发展规划',
        abstract: `"十四五"时期是我国${keyword}产业发展的重要战略机遇期，要以习近平新时代中国特色社会主义思想为指导...`
      },
      {
        id: '3',
        title: `关于加强${keyword}工作的实施方案`,
        department: '工业和信息化部',
        date: '2023-09-20',
        type: '实施方案',
        abstract: `为贯彻落实党中央、国务院关于${keyword}的决策部署，制定本实施方案...`
      }
    ];

    setPolicyResults(mockResults);
    setResultsLoading(false);
  };

  // 处理策略选择
  const handleStrategySelect = (strategyId: string) => {
    setSelectedStrategy(strategyId);
    fetchPolicyDocuments(strategyId);
    
    // 等待数据加载完成后滚动
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 返回按钮 */}
      <Link to="/" className="inline-flex items-center text-blue-600 mb-6">
        <ArrowLeftOutlined className="mr-2" />
        返回搜索
      </Link>

      {/* 搜索信息 */}
      <Title level={2} className="mb-4">
        搜索结果：{keyword}
      </Title>

      {/* 搜索策略部分 */}
      <Card className="mb-6">
        <div className="flex items-center mb-4">
          <ThunderboltOutlined className="text-2xl text-blue-600 mr-2" />
          <Title level={4} className="mb-0">推荐搜索策略</Title>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
          </div>
        ) : (
          <List
            dataSource={searchStrategies}
            renderItem={(strategy: SearchStrategy) => (
              <List.Item>
                <Card 
                  className={`w-full hover:shadow-md transition-shadow cursor-pointer ${
                    selectedStrategy === strategy.id ? 'border-blue-500 shadow-md' : ''
                  }`}
                  onClick={() => handleStrategySelect(strategy.id)}
                >
                  <Title level={5}>{strategy.title}</Title>
                  <Paragraph className="text-gray-600">
                    {strategy.description}
                  </Paragraph>
                  <div className="flex flex-wrap gap-2">
                    {strategy.tags.map((tag, index) => (
                      <Tag key={index} color="blue">{tag}</Tag>
                    ))}
                  </div>
                </Card>
              </List.Item>
            )}
          />
        )}
      </Card>

      {/* 搜索结果展示 */}
      <div ref={resultsRef}>
        <Card>
          <div className="flex items-center mb-4">
            <FileTextOutlined className="text-2xl text-blue-600 mr-2" />
            <Title level={4} className="mb-0">政策文件</Title>
          </div>
          
          {!selectedStrategy ? (
            <Empty description="请选择搜索策略查看相关政策文件" />
          ) : resultsLoading ? (
            <div className="text-center py-8">
              <Spin size="large" />
            </div>
          ) : (
            <List
              dataSource={policyResults}
              renderItem={(policy: PolicyDocument) => (
                <List.Item>
                  <div className="w-full">
                    <Title level={5} className="mb-2">
                      <a href="#" className="text-blue-600 hover:text-blue-800">
                        {policy.title}
                      </a>
                    </Title>
                    <div className="flex items-center text-gray-500 text-sm mb-2 gap-4">
                      <span className="flex items-center">
                        <TeamOutlined className="mr-1" />
                        {policy.department}
                      </span>
                      <span className="flex items-center">
                        <CalendarOutlined className="mr-1" />
                        {policy.date}
                      </span>
                      <Tag color="blue">{policy.type}</Tag>
                    </div>
                    <Paragraph className="text-gray-600 mb-0">
                      {policy.abstract}
                    </Paragraph>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>

      {/* 添加知识图谱组件 */}
      {!loading && selectedStrategy && policyResults.length > 0 && (
        <PolicyGraph
          keyword={keyword}
          documents={policyResults}
        />
      )}
    </div>
  );
};

export default SearchResult; 