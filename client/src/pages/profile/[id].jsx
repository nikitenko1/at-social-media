import { useEffect, useState } from 'react';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import { useDispatch, useSelector } from 'react-redux';
import loading from '../../images/loading.gif';
import { getProfileUsers } from '../../redux/actions/profileAction';
import { useParams } from 'react-router-dom';
import Saved from '../../components/profile/Saved';

const Profile = () => {
  const [saveTab, setSaveTab] = useState(false);
  const { profile, auth } = useSelector((state) => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [dispatch, id, profile.ids, auth]);

  return (
    <div className="profile">
      <Info auth={auth} profile={profile} id={id} />
      {auth.user._id === id && (
        <div className="profile_tab">
          <button
            className={saveTab ? '' : 'active'}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={saveTab ? 'active' : ''}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}

      {profile.loading ? (
        <img src={loading} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <>
          {saveTab ? (
            <Saved auth={auth} id={id} />
          ) : (
            <Posts auth={auth} profile={profile} id={id} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
