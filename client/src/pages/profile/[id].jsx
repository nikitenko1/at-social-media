import { useEffect } from 'react';
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import { useDispatch, useSelector } from 'react-redux';
import loading from '../../images/loading.gif';
import { getProfileUsers } from '../../redux/actions/profileAction';
import { useParams } from 'react-router-dom';

const Profile = () => {
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

      {profile.loading ? (
        <img src={loading} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <Posts auth={auth} profile={profile} id={id} />
      )}
    </div>
  );
};

export default Profile;
