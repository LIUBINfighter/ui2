import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';

interface GraphNode {
  id: string;
  name: string;
  symbolSize: number;
  category: number;
  itemStyle?: {
    color: string;
  };
}

interface GraphLink {
  source: string;
  target: string;
}

interface PolicyGraphProps {
  keyword: string;
  documents: Array<{
    id: string;
    title: string;
    type: string;
  }>;
}

// 定义文件类型对应的颜色和类别
const FILE_TYPES = {
  '指导意见': { color: '#FF4D4F', category: 1 },
  '发展规划': { color: '#52C41A', category: 2 },
  '实施方案': { color: '#1890FF', category: 3 },
  '通知公告': { color: '#722ED1', category: 4 },
  '政策解读': { color: '#FA8C16', category: 5 },
  '其他': { color: '#8C8C8C', category: 6 }
};

const PolicyGraph: React.FC<PolicyGraphProps> = ({ keyword, documents }) => {
  const [option, setOption] = useState({});

  useEffect(() => {
    // 构建图谱数据
    const nodes: GraphNode[] = [
      {
        id: 'keyword',
        name: keyword,
        symbolSize: 50,
        category: 0,
        itemStyle: {
          color: '#F5222D' // 关键词节点颜色
        }
      },
      ...documents.map(doc => {
        const typeConfig = FILE_TYPES[doc.type as keyof typeof FILE_TYPES] || FILE_TYPES['其他'];
        return {
          id: doc.id,
          name: doc.title.length > 10 ? doc.title.slice(0, 10) + '...' : doc.title,
          symbolSize: 30,
          category: typeConfig.category,
          itemStyle: {
            color: typeConfig.color
          }
        };
      })
    ];

    const links: GraphLink[] = documents.map(doc => ({
      source: 'keyword',
      target: doc.id,
    }));

    // 文件之间的关联（根据类型建立连接）
    documents.forEach((doc1, index) => {
      documents.forEach((doc2, index2) => {
        if (index < index2 && doc1.type === doc2.type) {
          links.push({
            source: doc1.id,
            target: doc2.id,
          });
        }
      });
    });

    const graphOption = {
      tooltip: {
        show: true,
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            const doc = documents.find(d => d.id === params.data.id);
            if (doc) {
              return `
                <div class="font-bold">${doc.title}</div>
                <div>类型：${doc.type}</div>
              `;
            }
            return params.data.name;
          }
          return '';
        }
      },
      legend: {
        data: ['关键词', ...Object.keys(FILE_TYPES)],
        textStyle: {
          color: '#666'
        },
        selectedMode: 'multiple'
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: links,
        categories: [
          { name: '关键词' },
          ...Object.entries(FILE_TYPES).map(([name, config]) => ({
            name,
            itemStyle: {
              color: config.color
            }
          }))
        ],
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          fontSize: 12,
          color: '#666'
        },
        force: {
          repulsion: 200,
          edgeLength: 120,
          gravity: 0.2
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 8],
        lineStyle: {
          color: '#bfbfbf',
          opacity: 0.6,
          width: 1,
          curveness: 0.3,
          type: 'solid'
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 2
          }
        }
      }]
    };

    setOption(graphOption);
  }, [keyword, documents]);

  return (
    <div className="fixed bottom-6 right-6 w-96 h-96 shadow-lg rounded-lg overflow-hidden bg-white">
      <Card 
        title={
          <div className="flex items-center justify-between">
            <span>政策关系图谱</span>
            <span className="text-xs text-gray-500">
              (可拖拽查看)
            </span>
          </div>
        }
        className="w-full h-full"
        bodyStyle={{ height: 'calc(100% - 48px)', padding: '12px' }}
      >
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </Card>
    </div>
  );
};

export default PolicyGraph; 