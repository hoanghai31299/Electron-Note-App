import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderButton from '../components/Common/LoaderButton';
import {
  AVATAR_STORAGE,
  getImageFromStorage,
  storage,
  uploadImageToStorage,
} from '../database';
import { updateUser } from '../database/users';
import { IMainState } from '../interface';
import { actionSetUser } from '../redux/action';
import { AiOutlineUpload } from 'react-icons/ai';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
function BeforeLogged() {
  const [loading, setLoading] = React.useState(false);
  const client = useSelector((state: IMainState) => state.client);
  const dispatch = useDispatch();
  const [form, setForm] = React.useState<{
    nextForm: boolean;
    name: string;
    photo: any;
  }>({
    nextForm: false,
    name: '',
    photo: {},
  });
  const [error, setError] = React.useState({});
  const [fileList, setFileList] = React.useState([]);
  const onFormInputChange = (e: any) => {
    const field = e.target.id;
    setForm({ ...form, [field]: e.target.value });
  };
  const history = useHistory();
  const handleChangePhoto = () => {
    const file: any = fileList[0];
    const photo = file?.originFileObj;
    const id = uuidv4();
    setLoading(true);
    uploadImageToStorage(AVATAR_STORAGE, id, photo).on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
        setError(error);
      },
      () => {
        getImageFromStorage(AVATAR_STORAGE, id).then((url) => {
          const photoURL = url.toString();
          dispatch(actionSetUser({ ...client, photoURL }));
          updateUser(client.id, {
            photoURL,
          });
          setLoading(false);
          history.push('/');
        });
      }
    );
  };

  React.useEffect(() => {
    if (client?.displayName) {
      setForm({ ...form, nextForm: true });
    }
  }, [client]);

  const handleChangeName = () => {
    if (form.name) {
      setLoading(true);
      updateUser(client.id, { displayName: form.name }).then((user) => {
        setLoading(false);
        dispatch(actionSetUser({ ...client, displayName: form.name }));
        setForm({ ...form, nextForm: true });
      });
    }
  };
  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  const onChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
  };
  const uploadButton = (
    <span>
      <AiOutlineUpload /> Upload
    </span>
  );
  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const getFormPhoto = () => {
    return (
      <React.Fragment>
        <div className="signin-heading mb-5">
          <span className="text-center">
            Noice, bây giờ hãy chọn một ảnh thật đẹp để làm avatar
          </span>
        </div>
        <div className="image-preview mb-5" title="Choose avatar">
          <ImgCrop rotate shape="round">
            <Upload
              beforeUpload={beforeUpload}
              multiple={false}
              fileList={fileList}
              action={() => ''}
              listType="picture-card"
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length === 0 && uploadButton}
            </Upload>
          </ImgCrop>
        </div>
        <LoaderButton
          disabled={fileList.length === 0}
          loading={loading}
          onClick={handleChangePhoto}
        >
          Tiếp theo
        </LoaderButton>
      </React.Fragment>
    );
  };
  const getFormName = () => {
    return (
      <React.Fragment>
        <div className="signin-heading mb-5">
          <span className="text-center">
            Trước khi bắt đầu, chúng tôi có thể biết tên bạn được không?
          </span>
        </div>
        <input
          value={form.name}
          onChange={onFormInputChange}
          id="name"
          className="form-control mb-2"
          placeholder="Nhập tên của bạn"
        />
        <LoaderButton
          disabled={form.name.length === 0}
          loading={loading}
          onClick={handleChangeName}
        >
          Tiếp theo
        </LoaderButton>
      </React.Fragment>
    );
  };

  return (
    <div className="signin-page">
      <div className="container w-100 h-100  d-flex justify-content-center align-items-center flex-column">
        {!form.nextForm ? getFormName() : getFormPhoto()}
      </div>
    </div>
  );
}

export default BeforeLogged;
