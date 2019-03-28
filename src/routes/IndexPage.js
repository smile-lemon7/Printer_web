import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Steps, Button, Upload, Icon} from 'antd';
import styles from './IndexPage.less';
import { file_host, UploadURL } from '../constants';
import { getLocalStorage, formatFile } from '../utils/utils';
import { WxAppID } from "../constants";
import QRCode from 'qrcode.react';


const redirect = 'http://192.168.1.104:8000';
const state = '';
const scope = 'snsapi_login';

const Step = Steps.Step;
const steps = [{
  title: '上传文件',
}, {
  title: '配置打印内容',
}, {
  title: '找到终端扫一扫打印',
}];

class IndexPage extends Component {
  state = {
    fileUrl: '',
    user_id: '',
  };

  componentWillMount() {
    const { query } = this.props;
    query({user_id: getLocalStorage('logined')*1});
    this.setState({user_id: getLocalStorage('logined')*1})
  }

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleChange = info => {
    const { uploadFile } = this.props;
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: file_host + info.file.response,
      });
      uploadFile({path: info.file.response, user_id: this.state.user_id});
    }
  };

  render() {
    const { current, fileUrl, user_id } = this.state;
    let { list, loading, url, info, currentOrder, onConfirm, onUpload } = this.props;
    list = list.map(item => ({...item, name: formatFile(item.files.content).name, type: formatFile(item.files.content).type}));

    const uploadButton = (
      <div className={styles.btnWrap}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </div>
    );

    return (
      <div className={styles.wrap}>
        <Row>
          <Col span={24}>
            <div className={styles.topBar}>
              <h1 className={styles.title}><a href="javascript:;" >知印云</a></h1>
            </div>
          </Col>
        </Row>
        <div className={styles.contentContainer}>
          <div className={styles.progressWrap}>
            <Row align="middle" type="flex" justify="center" style={{width:'100%'}}>
              <Col xs={{ span: 5 }} lg={{ span: 4}} md={4} sm={5} xl={4} xxl={4}>
                <div className={styles.titleWrap}>
                  <p className={styles.progressTitle}>打印步骤</p>
                </div>
              </Col>
              <Col xs={{ span: 20 }} lg={{ span: 20}} md={20} sm={20} xl={20} xxl={20}>
                <Steps 
                    current={['/upload', '/selectParams', '/order'].indexOf(url)}
                    className={styles.progressBar} 
                  >
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                  </Steps>
              </Col>
            </Row>
          </div>
          <div className={styles.B}>
            <Row type="flex" justify="space-around">
              <Col xs={{ span: 5 }} lg={{ span: 5}} style={{height:'100%'}}>
                <div className={styles.orderWrap}>
                  <p className={styles.title}>我的订单</p>
                  <div className={styles.filesWrap}>
                    {loading?<Icon type="loading" size="lg"/>:
                      <div className={styles.files}>
                        {list.map(item => (
                          <div className={styles.item} key={item.id}>
                            <img src="http://s13.sinaimg.cn/middle/001lBAbIzy6WXN6yXhO2c&690" alt="http://s13.sinaimg.cn/middle/001lBAbIzy6WXN6yXhO2c&690" />
                            <span>{item.name}</span>
                          </div>
                        ))
                        }
                      </div>
                    }
                  </div>
                </div>
              </Col>
              <Col xs={{ span: 11 }} lg={{ span: 12 }}>
                <div className={styles.mainWrap}>
                {url === '/upload'?
                  <Upload
                    name="file"
                    // listType="picture-card"
                    showUploadList={true}
                    action={UploadURL}
                    onChange={this.handleChange}
                    multiple={true}
                  >
                    {fileUrl ? <img src={fileUrl} alt="file" /> : uploadButton}
                  </Upload>:null

                }
                {url === '/selectParams'?
                  <div className={styles.paramsWrap}>
                    <div className={styles.item}>
                      <img src="http://s13.sinaimg.cn/middle/001lBAbIzy6WXN6yXhO2c&690" alt="http://s13.sinaimg.cn/middle/001lBAbIzy6WXN6yXhO2c&690" />
                      <p className={styles.fileName}>{formatFile(info.content).name}</p>
                      <Button onClick={()=>onConfirm({user_id, id: info.id})}>确认订单</Button>
                    </div>
                  </div>:null
                }
                {url === '/order'?
                  <div className={styles.paramsWrap}>
                    <div className={styles.item}>
                      <div className={styles.codeWrap}>
                         <QRCode value={currentOrder.qrcode} />
                        {/* {currentOrder.status !== 0?<div className={styles.mask}></div>: null} //二维码失效 */}
                        <div className={styles.mask}></div>
                        <div className={styles.maskTitle}>已完成</div>
                      </div>
                      <img src="http://s13.sinaimg.cn/middle/001lBAbIzy6WXN6yXhO2c&690" alt="http://s13.sinaimg.cn/middle/001lBAbIzy6WXN6yXhO2c&690" />
                      <span className={styles.fileName}>{formatFile(currentOrder.files.content).name}</span>
                      <div>
                        <Button onClick={onUpload}>继续上传</Button>
                      </div>
                    </div>
                  </div>:null
                }
                {url === '/login'&&!user_id?
                  <div className={styles.loginCode} id="login_code" >
                    <iframe className={styles.loginIframe}
                      frameBorder="0"
                      sandbox="allow-scripts allow-same-origin allow-top-navigation"
                      scrolling="no"
                      src={`https://open.weixin.qq.com/connect/qrconnect?appid=${WxAppID}&redirect_uri=${redirect}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`}>
                    </iframe>
                  </div>: null
                }
                  
                  {/* <Upload
                    name="file"
                    // listType="picture-card"
                    showUploadList={true}
                    action={UploadURL}
                    onChange={this.handleChange}
                    multiple={true}
                  >
                    {fileUrl ? <img src={fileUrl} alt="file" /> : uploadButton}
                </Upload> */}
                </div>
              </Col>
              <Col xs={{ span: 5 }} lg={{ span: 5 }}>
                <div className={styles.smallProgramWrap}>
                  <div className={styles.codeWrap}></div>
                  <div className={styles.title}>扫描添加小程序</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

IndexPage.propTypes = {

};
const mapState2Props = ({user, files, loading: { effects }}) => {
  let {list, url, info, currentOrder} = files;
  return {
    user_id: user.id,
    list, 
    url, 
    info, 
    currentOrder,
    loading: effects['files/query'],
  }
}

const mapDispatch2Props = (dispatch) => ({
  uploadFile(params) {
    dispatch({type: 'files/upload', payload: params});
  },
  query(params) {
    dispatch({type: 'files/query', payload: params});
  },
  onConfirm(params) {
    dispatch({type: 'files/confirmOrder', payload: params});
  },
  onUpload() {
    dispatch({type:'files/saveUrl', payload: '/upload'})
  }

})
export default connect(mapState2Props, mapDispatch2Props)(IndexPage);
