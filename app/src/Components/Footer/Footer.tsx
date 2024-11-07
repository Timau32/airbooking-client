import { Typography } from 'antd';
import Container from '../Container/Container';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <Container>
        <Typography.Paragraph style={{color: '#ffffff'}}>
          Здесь будет подробная информация про компанию и политику данный текст является зашлушкой для визуального
          отображение.
          <br /> In do in exercitation enim ad laborum sit deserunt excepteur voluptate Lorem commodo do consequat.
          Voluptate laboris consequat laboris ipsum est voluptate irure veniam. Est consequat in eiusmod deserunt id.
          Excepteur duis tempor magna deserunt et non pariatur dolore ullamco id culpa ea. Commodo est in sunt quis. Eu
          dolore eu proident duis qui consequat. Quis id qui magna anim. Sint officia mollit enim sint veniam minim.
          Amet pariatur nulla nisi voluptate deserunt enim. Laborum pariatur esse voluptate est laborum laboris. Duis in
          anim aliquip dolor enim pariatur ipsum ex anim reprehenderit cupidatat qui mollit dolore. Minim deserunt duis
          non Lorem eiusmod adipisicing nostrud mollit enim sint.
        </Typography.Paragraph>
      </Container>
    </footer>
  );
};

export default Footer;
