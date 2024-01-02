import React from 'react';
import type { ErrorInfo } from 'react';
import Empty from '@finance/empty';

export class CustomBoundary extends React.Component<
  Record<string, any>,
  { hasError: boolean; errorInfo: string }
> {
  state = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_HELPLESS}
          size="middle"
          description="发生了未知渲染错误，请稍后再试"
        />
      );
    }
    return this.props.children;
  }
}
