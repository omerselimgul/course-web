import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Button, WrapperContainer } from "../../Base";
import apiUrls from "../../Constant/apiurls/apiurls";
import { UseApi } from "../../Context/Api/useApi";
import { useAuth } from "../../Context/AuthContext";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import FindInPageIcon from "@mui/icons-material/FindInPage";
import SelectInput from "../../Base/select/select";
import AppCard from "../../Components/AppCard/AppCard";
import { UserRoles, convertDateTimeToDate } from "../../Helper/helper";

const App = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [applicationsData, setApplicationsData] = useState([]);
  const [filter, setfilter] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const { executeGet, executeAsync } = UseApi();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    setFilteredData(
      applicationsData.filter((x) => {
        if (filter.CourseId != null && filter.Status != null) {
          return x.courseId === filter.CourseId && x.status === filter.Status;
        } else if (filter.CourseId != null) {
          return x.courseId === filter.CourseId;
        } else if (filter.Status != null) {
          return x.status === filter.Status;
        }
        return true;
      })
    );
  }, [filter]);

  const fetchData = async () => {
    const userId = user.userId;

    await executeGet({
      url: apiUrls.Application + "/ByUserId?userId=" + userId,
    }).then(async (response) => {
      if (response?.data && response.data.length > 0) {
        setApplicationsData([...response?.data]);
        setFilteredData([...response?.data]);
        const listOfCourse = [];
        listOfCourse.push({ value: null, field: "None" });
        response.data.map((item) => {
          if (listOfCourse.findIndex((x) => x.value == item.courseId) === -1) listOfCourse.push({ field: item.courseName, value: item.courseId });
        });
        setCourseList([...listOfCourse]);
      }
    });
  };

  const handleButtonClick = (application, status) => {
    const url = apiUrls.Application + "/status?id=" + application.applicationId + "&status=" + status;
    executeAsync({
      url: url,
      method: "PUT",
    }).then((res) => {
      if (res?.success) {
        enqueueSnackbar("Başarıyla tamamlandı", {
          variant: "success",
        });
        fetchData();
      }
    });
  };
  return (
    <WrapperContainer inner>
      <SelectInput
        xs={4}
        label="Kurs"
        value={filter.CourseId}
        required
        valuePath="value"
        labelPath="field"
        dataSource={courseList}
        onChange={(value) => setfilter({ ...filter, CourseId: value })}
      />
      <SelectInput
        xs={4}
        label="Durumu"
        value={filter.Status}
        required
        valuePath="value"
        labelPath="field"
        dataSource={[
          { value: null, field: "None" },
          { value: 0, field: "Devam edenler" },
          { value: 1, field: "Onaylananlar" },
          { value: 2, field: "Reddedilenler" },
        ]}
        onChange={(value) => setfilter({ ...filter, Status: value })}
      />
      <div xs={12}>
        {filteredData?.map((application, index) => (
          <Accordion
            key={index}
            sx={{
              marginTop: "6px ",
            }}
          >
            <AccordionSummary expandIcon={<ArrowForwardIosIcon />} aria-controls={`panel${index}a-content`} id={`panel${index}a-header`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <Typography
                    sx={{
                      fontSize: "20px",
                    }}
                  >
                    {application.courseName}
                  </Typography>
                </div>
                <div>
                  <Typography
                    sx={{
                      marginRight: "17px",
                    }}
                  >
                    {application.firstName + " " + application.lastName}
                  </Typography>
                </div>
                <div>
                  <Typography>
                    {application.status === 0 && "Başvuru Devam Ediyor"}
                    {application.status === 1 && "Başvuru Onaylandı"}
                    {application.status === 2 && "Başvuru Reddedildi"}
                  </Typography>
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            width: "100%",
                            minWidth: "200px",
                            bgcolor: "background.paper",
                          }}
                        >
                          <nav aria-label="main mailbox folders">
                            <List sx={{ width: "100%" }}>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <BadgeOutlinedIcon style={{ fontSize: "30px" }} />
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontSize: "18px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Kimlik Bilgileri
                                      </Typography>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                              <Divider />
                              <AppCard primary="Adı" secondary={application.firstName} />
                              <Divider />
                              <AppCard primary="Soyadı" secondary={application.lastName} />
                              <Divider />
                              <AppCard primary="TC Kimlik No" secondary={application.identifyNumber} />
                              <Divider />
                              <AppCard primary="Doğum Tarihi" secondary={convertDateTimeToDate(application.birthDate)} />
                              <Divider />
                              <AppCard primary="Cinsiyet" secondary={application.gender} />
                            </List>
                          </nav>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            width: "100%",
                            minWidth: "200px",
                            bgcolor: "background.paper",
                          }}
                        >
                          <nav aria-label="main mailbox folders">
                            <List sx={{ width: "100%" }}>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <SchoolOutlinedIcon style={{ fontSize: "30px" }} />
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontSize: "18px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Eğitim Bilgileri
                                      </Typography>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                              <Divider />

                              <AppCard primary="Lise" secondary={application.highSchool} />
                              <Divider />
                              <AppCard primary="Mezuniyet Tarihi" secondary={convertDateTimeToDate(application.highSchoolGradiationDate)} />
                              <Divider />
                              <AppCard
                                primary="Lise Diploması"
                                secondary={
                                  <a href={application.highSchoolFile} target="_blank" rel="noreferrer">
                                    <FindInPageIcon />
                                  </a>
                                }
                              />
                              <Divider />
                              <AppCard primary="Üniversite" secondary={application.university} />
                              <Divider />
                              <AppCard primary="Bölüm" secondary={application.universityDepartment} />
                              <Divider />
                              <AppCard primary="Mezuniyet Tarihi" secondary={convertDateTimeToDate(application.universityGradiationDate)} />
                              <Divider />
                              <AppCard
                                primary="Üniversite Diploması"
                                secondary={
                                  <a href={application.universityFile} target="_blank" rel="noreferrer">
                                    <FindInPageIcon />
                                  </a>
                                }
                              />
                            </List>
                          </nav>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            width: "100%",
                            // maxWidth: 390,
                            minWidth: "200px",
                            bgcolor: "background.paper",
                          }}
                        >
                          <nav aria-label="main mailbox folders">
                            <List sx={{ width: "100%" }}>
                              <ListItem disablePadding>
                                <ListItemButton>
                                  <PersonOutlineOutlinedIcon style={{ fontSize: "30px" }} />
                                  <ListItemText
                                    primary={
                                      <Typography
                                        style={{
                                          fontSize: "18px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Kişisel Bilgiler
                                      </Typography>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                              <Divider />

                              <AppCard primary="E posta" secondary={application.email} />
                              <Divider />
                              <AppCard primary="Cep Telefonu" secondary={application.phoneNumber} />
                              <Divider />
                              <AppCard primary="İl" secondary={application.city} />
                              <Divider />
                              <AppCard primary="İlçe" secondary={application.district} />
                              <Divider />
                              <AppCard primary="İletişim Adresi" secondary={application.address} />
                            </List>
                          </nav>
                        </Box>
                        <Button
                          userType={[UserRoles.Admin, UserRoles.Educator]}
                          variant="contained"
                          label={"Red"}
                          style={{
                            float: "right",
                            color: "white",

                            width: "80px",
                            marginTop: "60px",
                            borderRadius: "7px",
                            backgroundColor: "red",
                          }}
                          onClick={() => handleButtonClick(application, 2)} // Red button
                        />
                        <Button
                          userType={[UserRoles.Admin, UserRoles.Educator]}
                          variant="contained"
                          label={"Onay"}
                          style={{
                            float: "right",
                            color: "white",

                            width: "80px",
                            marginTop: "60px",
                            marginRight: "20px",
                            borderRadius: "7px",
                            backgroundColor: "#08cc46",
                          }}
                          onClick={() => handleButtonClick(application, 1)} // Onay button
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </WrapperContainer>
  );
};

export default App;
