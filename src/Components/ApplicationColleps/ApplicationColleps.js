import {
  educationFields,
  identifyFields,
  personalFields,
} from "../../Helper/helper";
import React, { useEffect, useState } from "react";
import { Button } from "../../Base";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { UseApi } from "../../Context/Api/useApi";
import apiUrls from "../../Constant/apiurls/apiurls";
import { useSnackbar } from "notistack";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import AppCard from "../../Components/AppCard/AppCard";

// tamamlanmadı henüz

const ApplicationColleps = ({ source, index, ...props }) => {
  const [dataSource, setDataSource] = useState({});

  useEffect(() => {
    setDataSource(source);
  }, [source]);

  return (
    <Accordion
      key={index}
      sx={{
        marginTop: "6px ",
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowForwardIosIcon />}
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
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
                marginLeft: "20px",
              }}
            >
              {source.name} {source.surname}
            </Typography>
          </div>
          <div>
            <Typography
              sx={{
                marginRight: "17px",
              }}
            >
              {source.status === 0 && "Başvuru Devam Ediyor"}
              {source.status === 1 && "Başvuru Onaylandı"}
              {source.status === 2 && "Başvuru Reddedildi"}
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
                      bgcolor: "background.paper",
                      maxWidth: "400px",
                      minWidth: "300px",
                    }}
                  >
                    <nav aria-label="main mailbox folders">
                      <List>
                        <ListItem disablePadding>
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
                        </ListItem>
                        {identifyFields.map((item) => {
                          return (
                            <>
                              <Divider />
                              <AppCard
                                primary={item.name}
                                secondary={dataSource[item.field]}
                              />
                            </>
                          );
                        })}
                      </List>
                    </nav>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      maxWidth: "400px",
                      minWidth: "300px",
                    }}
                  >
                    <nav aria-label="main mailbox folders">
                      <List>
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
                        {educationFields.map((item) => {
                          return (
                            <>
                              <Divider />
                              <AppCard
                                primary={item.name}
                                secondary={dataSource[item.field]}
                              />
                            </>
                          );
                        })}
                      </List>
                    </nav>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      maxWidth: "400px",
                      minWidth: "300px",
                    }}
                  >
                    <nav aria-label="main mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <PersonOutlineOutlinedIcon
                            style={{ fontSize: "30px" }}
                          />
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
                        </ListItem>
                        <Divider />
                        {personalFields.map((item) => {
                          return (
                            <>
                              <AppCard
                                primary={item.name}
                                secondary={dataSource[item.field]}
                              />
                              <Divider />
                            </>
                          );
                        })}
                      </List>
                    </nav>
                  </Box>
                  <Button
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
                    // onClick={() => handleButtonClick(application, 2)} // Red button
                  />
                  <Button
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
                    // onClick={() => handleButtonClick(application, 1)} // Onay button
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default ApplicationColleps;
