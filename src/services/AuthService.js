
/*service file mostly for aunthetication...has functions registerUser,loginUser,refreshToken and logoutUser
...i have also added function getProfile to fetch user details,and uploadProfilePicture...Inside it i have had to override the 
app.js headers since the profile picture is not json rather multipat form data */



import api from './app';

export const registerUser = (data) => {
    return api.post('register/', data);
};

export const loginUser = (data) => {
    return api.post('login/', data);
};

export const refreshToken = () => {
    return api.post('refresh/');
};

export const logoutUser = () => {
    return api.post('logout/');
  
};

export const getProfile=()=>{
    return api.get('profile/')
}
export const uploadProfilePicture = (formData) => {
  return api.patch('profile/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



