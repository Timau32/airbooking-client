import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Container } from '../../Components';
import LoadingComponents from '../../Components/Spinner/LoadingComponents';
import { IInfo } from '../../interfaces';
import { useAppSelector } from '../../store/hook';

function Info() {
  const { isLoadingInfo, info } = useAppSelector((state) => state.apartment);
  const [selectedInfo, setSelectedInfo] = useState<IInfo | null>(null);

  const params = useParams();
  useEffect(() => {
    api.getInfoDetail(params?.slug || '').then((response) => setSelectedInfo(response.data));
  }, []);

  return (
    <>
      <section style={{margin: '40px 0'}}>
        <Container>
          <Typography.Title>{selectedInfo?.title}</Typography.Title>
          <div
            style={{ background: '#fff', borderRadius: '20px', padding: '20px'}}
            dangerouslySetInnerHTML={{ __html: selectedInfo?.content || '' }}
          />
        </Container>
      </section>

      {isLoadingInfo && <LoadingComponents />}
    </>
  );
}

export default Info;
