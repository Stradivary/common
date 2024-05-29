import React from 'react';
import { Modal, Button, Typography } from '../components';

class Wrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <div style={{ display: 'flex', padding: 10 }}>
          <Button onClick={this.toggleModal}>
            <Typography>Open Modal</Typography>
          </Button>
        </div>
        <Modal visible={visible} onClose={this.toggleModal}>
          <div
            style={{
              display: 'block',
              width: 100,
              height: 100,
              marginBottom: 8,
            }}
          />
          <Typography
            color="blue80"
            weight={600}
            size="2rem"
            lineHeight="2.5rem"
            letterSpacing="0.4px"
          >
            Batalkan Perubahan?
          </Typography>
          <Typography color="neutral70" wordBreak="break-word" size="1.4rem">
            Perubahan yang Anda buat belum tersimpan. Yakin ingin membatalkan
            perubahan?
          </Typography>
          <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
            <Button
              onClick={this.toggleModal}
              variant="outlined"
              bgColor="primary"
              color="primary"
            >
              <Typography>Ya, Batalkan</Typography>
            </Button>
            <Button onClick={this.toggleModal}>
              <Typography>Kembali</Typography>
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}
export default {
  default: <Wrapper />,
};
