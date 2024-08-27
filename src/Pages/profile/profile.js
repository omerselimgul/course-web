import React, { useEffect, useState } from "react";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import Basvurular from './app';
import Egitimler from './edu';
import KimlikBilgileri from './identity';
import EgitimBilgileri from './eduinf';
import IletişimBilgileri from './adrinf';
import './profile.css';

import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  const { executeGet } = UseApi();
  const { user } = useAuth();
  const [applicationsData, setApplicationsData] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(0); // Başvurular varsayılan olarak seçili

    const handleClick = (index) => {
      setSelectedItem(index);
    };
    useEffect(() => {
        if (user) {
         setFormData(prevState => ({
          ...prevState,
          name: user.firstName || '',
          surName: user.lastName || '',
         }));
         
        }
       }, [user]);
       
       useEffect(() => {
        if (user && !formData.userId) { // Check if formData is empty or user is changed
            executeGet({ url: apiUrls.User + "/" + user.userId })
                .then((response) => {
                    if (response.success) {
                        setFormData(response.data); // Assuming API response contains all user data
                    } else {
                        console.error("Kullanıcıya ait veri bulunamadı.");
                    }
                })
                .catch((error) => {
                    console.error("Veri alınırken hata oluştu:", error);
                });
        }
    }, [user]);
    const renderContent = () => {
        switch(selectedItem) {
          case 0:
            return <Basvurular />;
          case 1:
            return <Egitimler />;
          case 2:
            return <KimlikBilgileri />;
          case 3:
            return <EgitimBilgileri />;
            case 4:
              return <IletişimBilgileri />;
          default:
            return null;
        }
      };
      return (
        <div className="LayoutInnerContainer">
        <div className="LayoutContainer">
            <div className="ListContainer">
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                {formData.firstName}{" "}{formData.lastName}
                  </ListSubheader>
                }
              >
                <ListItemButton onClick={() => handleClick(0)} selected={selectedItem === 0}>
                  <ListItemIcon>
                    <PersonOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Başvurular" />
                </ListItemButton>
                <ListItemButton onClick={() => handleClick(1)} selected={selectedItem === 1}>
                  <ListItemIcon>
                    <SchoolOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Eğitimler" />
                </ListItemButton>
                <ListItemButton onClick={() => handleClick(2)} selected={selectedItem === 2}>
                  <ListItemIcon>
                    <BadgeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Kimlik Bilgileri" />
                </ListItemButton>
                <ListItemButton onClick={() => handleClick(3)} selected={selectedItem === 3}>
                  <ListItemIcon>
                    <AccountBalanceOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Eğitim Bilgileri" />
                </ListItemButton>
                <ListItemButton onClick={() => handleClick(4)} selected={selectedItem === 4}>
                  <ListItemIcon>
                    <MapsHomeWorkOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="İletişim Bilgileri" />
                </ListItemButton>
              </List>
            </div>
            
            <div className="ContentContainer">
              {renderContent()}
            </div>
            </div>
        </div>
      
  
  );
}

export default Profile;