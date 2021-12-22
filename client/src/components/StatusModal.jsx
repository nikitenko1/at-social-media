import { TYPES } from '../redux/actions/_types';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';

const StatusModal = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState(false);
  //
  const videoRef = useRef();
  const refCanvas = useRef();
  //
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist.');
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (err = 'Image format is invalid.');
      }
      return newImages.push(file);
    });
    if (err)
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err,
        },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  // The MediaDevices.getUserMedia() method prompts the user for permission to use a media input

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;
    refCanvas.current.setAttribute('width', width);
    refCanvas.current.setAttribute('height', height);
    const ctx = refCanvas.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    // tracks.stop();
    setStream(false);
  };
  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() => dispatch({ type: TYPES.STATUS, payload: false })}
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                <img
                  className="img-thumbnail"
                  src={img.camera ? img.camera : URL.createObjectURL(img)}
                  alt="images"
                  style={{ filter: theme ? 'invert(1)' : 'invert(-1)' }}
                />
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: 'none' }} />
            </div>
          )}

          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />

                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleChangeImages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="status_footer my-2 ">
          <button className="btn btn-outline-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;