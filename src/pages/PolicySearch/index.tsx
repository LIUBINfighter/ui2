import React, { useState } from 'react';
import { Select, Input, Radio, DatePicker, Button, Popover, AutoComplete } from 'antd';
import { SearchOutlined, BulbOutlined, HistoryOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const PolicySearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>([]);

  // 模拟的热门搜索词
  const hotSearches = [
    '碳达峰碳中和',
    '乡村振兴',
    '数字经济',
    '科技创新',
    '营商环境'
  ];

  // 搜索词补全
  const handleSearch = (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }

    // 模拟搜索补全
    const searchSuggestions = [
      `${value}相关政策`,
      `${value}实施细则`,
      `${value}补充通知`,
      `最新${value}政策`,
      `${value}解读文件`
    ].map(item => ({ value: item }));

    setOptions(searchSuggestions);
  };
  
  // 关键词联想的内容
  const keywordSuggestions = (
    <div className="p-4 max-w-xs">
      <h4 className="text-gray-700 font-medium mb-2">相关关键词推荐</h4>
      <div className="space-y-2">
        {searchValue && (
          <div className="flex flex-wrap gap-2">
            {[
              `${searchValue}实施细则`,
              `${searchValue}解读`,
              `${searchValue}补充通知`,
              `最新${searchValue}政策`
            ].map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-sm cursor-pointer hover:bg-blue-100"
                onClick={() => setSearchValue(keyword)}
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // 热门搜索内容
  const hotSearchContent = (
    <div className="p-4 max-w-xs">
      <h4 className="text-gray-700 font-medium mb-2">热门搜索</h4>
      <div className="flex flex-wrap gap-2">
        {hotSearches.map((keyword, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => setSearchValue(keyword)}
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题 */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-blue-900">政策文献检索</h1>
        <p className="text-gray-600 mt-2">按地区、类型和时间检索政策文件</p>
      </div>

      {/* 搜索区域 */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* 快捷工具 - 移动到这里 */}
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="mr-2">快捷工具:</span>
            <a href="#" className="text-blue-600 mr-4">政策分析</a>
            <a href="#" className="text-blue-600 mr-4">AI解读</a>
            <a href="#" className="text-blue-600 mr-4">政策对比</a>
            <Popover 
              content={keywordSuggestions}
              title={null}
              trigger="click"
              placement="bottom"
            >
              <a href="#" className="text-blue-600 flex items-center mr-4">
                <BulbOutlined className="mr-1" />
                关键词联想
              </a>
            </Popover>
            <Popover
              content={hotSearchContent}
              title={null}
              trigger="click"
              placement="bottom"
            >
              <a href="#" className="text-blue-600 flex items-center">
                <HistoryOutlined className="mr-1" />
                热门搜索
              </a>
            </Popover>
          </div>

          {/* 搜索框和区域选择 */}
          <div className="flex gap-2 mb-4">
            <Select defaultValue="all" className="w-32">
              <Option value="all">全部地区</Option>
              <Option value="central">中央政策</Option>
              <Option value="local">地方政策</Option>
            </Select>
            <AutoComplete
              className="flex-1"
              options={options}
              onSearch={handleSearch}
              onSelect={setSearchValue}
              value={searchValue}
              onChange={setSearchValue}
            >
              <Input.Search
                size="large"
                placeholder="输入政策关键词..."
                enterButton={<SearchOutlined />}
              />
            </AutoComplete>
          </div>

          {/* 文件类型选择 */}
          <div className="mb-4">
            <Radio.Group defaultValue="policy">
              <Radio value="policy">政策文件</Radio>
              <Radio value="regulation">法律法规</Radio>
              <Radio value="notice">通知公告</Radio>
              <Radio value="interpretation">政策解读</Radio>
            </Radio.Group>
          </div>

          {/* 高级筛选 */}
          <div className="flex items-center gap-4 mb-4">
            <RangePicker className="w-96" placeholder={['起始日期', '结束日期']} />
            <Button type="link">更多筛选</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicySearch; 