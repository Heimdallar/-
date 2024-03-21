import { useEffect } from 'react';
import { useNavigate } from '@umijs/max';
import styles from './index.less';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/homePage', { replace: true });
  }, [navigate]);

  return (
    <div className={styles.home}>
      {'Right Abstraction is far cheaper than the wrong Duplication'}
    </div>
  );
};

export default App;
