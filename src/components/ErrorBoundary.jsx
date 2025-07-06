import React from 'react';
import { Result, Button } from 'antd';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // 处理路由错误
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Result
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在。"
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              返回首页
            </Button>
          }
        />
      );
    }

    if (error.status === 401) {
      return (
        <Result
          status="403"
          title="403"
          subTitle="抱歉，您没有权限访问此页面。"
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              返回首页
            </Button>
          }
        />
      );
    }

    if (error.status === 503) {
      return (
        <Result
          status="500"
          title="503"
          subTitle="抱歉，服务器暂时不可用。"
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              重新加载
            </Button>
          }
        />
      );
    }
  }

  // 处理其他错误
  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务器出现了问题。"
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          重新加载
        </Button>
      }
    />
  );
};

export default ErrorBoundary; 