// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomAlert from "../../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();
  let obj = {
    navigationURL: "/Module/101",
    navigationTitle: "Add Store Location",
  };

  dispatch(navigation(obj));
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const handleOpenAlert = (msg, severity) => {
    setIsOpenAlert(true);
    setAlertMessage(msg);
    setAlertSeverity(severity);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenAlert(false);
  };
  const location = useLocation();
  const data = location.state && location.state.data;
  const navigate = useNavigate();
  let params = useParams();
  let id = parseInt(params.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();
  const [country, setCountry] = useState([]);
  const [managers, setManagers] = useState([]);
  const [city, setCity] = useState([]);

  const [state, setState] = useState({
    label: data ? data.label : "",
    managerId: data ? data.countryLabel : null,
    countryId: data ? data.countryId : null,
    cityId: data ? data.cityId : null,
    address: data ? data.address : null,
    branchData: data ? data.branchData : {},
    contactNo: data ? data.contactNo : "",
    managerLabel: data ? data.managerLabel : "",
  });
  const handleChange = (e) => {
    if (e.target.name == "countryId") {
      getAllByCountryId(e.target.value);
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const getStoreById = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getStoreById:", result);
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            getAllByCountryId(data.countryId);
            setState({
              label: data.label,
              managerId: data.managerId,
              countryId: data.countryId,
              cityId: data.cityId,
              address: data.address,
              contactNo: data.contactNo,
            });
          }
        } else {
        }
      })
      .catch((error) => {});
  };
  const getManagers = async () => {
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetUsersDropDownByFirm`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
        },
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setManagers(result.DATA);
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "success",
          });
        }
      })
      .catch((error) => {
        toast(<p style={{ fontSize: 16 }}>{error.USER_MESSAGE}</p>, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          type: "success",
        });
      });
    // setIsLoading(false);
  };
  const getAllCountries = async () => {
    // setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Countries/GetAll`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setCountry(result.DATA);
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "success",
          });
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later."}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "success",
          }
        );

        // console.log("error", error);
        // handleOpenAlert(
        //   <span>Failed to fetch ! Please try Again later.</span>,
        //   "danger"
        // );
      });
    // setIsLoading(false);
  };
  const getAllByCountryId = async (countryId) => {
    // setIsLoading(true);
    if (countryId != null) {
    } else {
      // handleOpenAlert(<span>Please select country first.</span>, "danger");

      //   setIsLoading(false);
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("countryId", countryId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Cities/GetAllByCountryId`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setCity(result.DATA);
          // toast(result.USER_MESSAGE);
        } else {
          // handleOpenAlert(<span>{result.USER_MESSAGE}</span>, "danger");
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "success",
          });
        }
      })
      .catch((error) => {
        toast("Failed to fetch ! Please try Again later.", {
          type: "error",
        });
        // console.log("error", error);
        // handleOpenAlert(
        //   <span>Failed to fetch ! Please try Again later.</span>,
        //   "danger"
        // );
      });
    // setIsLoading(false);
  };
  const saveBranch = async () => {
    // setIsLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("branchData"));
    if (id !== 0) {
      formdata.append("id", id);
    }
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          if (id !== 0) {
            toast(<p style={{ fontSize: 16 }}>{"Branch Updated"}</p>, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              newestOnTop: false,
              closeOnClick: true,
              rtl: false,
              pauseOnFocusLoss: true,
              draggable: true,
              pauseOnHover: true,
              type: "success",
            });
          }
          if (id === 0) {
            toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
              position: "top-right",
              autoClose: 3000,
              type: "success",
            });
          }

          setTimeout(function () {
            if (id != 0) {
              navigate("/AddStoreLocation");
            }
          }, 2000);
          setState({
            label: "",
            managerId: "",
            countryId: "",
            cityId: "",
            address: "",
            branchData: "",
            contactNo: "",
            managerLabel: "",
          });
        } else {
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch, Please try again!"}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "success",
          }
        );
      });

    // setIsLoading(false);
  };
  useEffect(() => {
    console.log(id, "datas");

    getManagers();
    getAllCountries();
    if (id !== 0) {
      getStoreById(id);
    }
  }, []);

  const handleNavigation = () => {
    setState({
      label: "",
      managerId: null,
      countryId: null,
      cityId: null,
      address: null,
      branchData: "",
      contactNo: "",
      managerLabel: "",
    });
    navigate("/StoreLocationList");
  };
  return (
    <Fragment>
      <ToastContainer />
      <Form id="branchData" >
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Store Name")}</Label>
            <Input
              id="label"
              name="label"
              value={state.label}
              onChange={handleChange}
              placeholder="Store Name"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Select Manager")}</Label>
            <Input
              type="select"
              name="managerId"
              id="managerId"
              value={state.managerId}
              onChange={handleChange}
            >
              <option></option>
              {managers && managers.length > 0
                ? managers.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Select Country")}</Label>
            <Input
              type="select"
              name="countryId"
              id="countryId"
              value={state.countryId}
              onChange={handleChange}
            >
              <option></option>
              {country && country.length > 0
                ? country.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Select City")}</Label>
            <Input
              type="select"
              name="cityId"
              id="cityId"
              value={state.cityId}
              onChange={handleChange}
            >
              <option></option>
              {city && city.length > 0
                ? city.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Address")}</Label>
            <Input
              id="address"
              name="address"
              value={state.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Contact No")}</Label>
            <Input
              id="contactNo"
              name="contactNo"
              value={state.contactNo}
              onChange={handleChange}
              placeholder="contact No"
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev "
            outline
            onClick={() => handleNavigation()}
          >
            <span className="align-middle d-sm-inline-block d-none">View</span>
          </Button>
          <Button
            // type="submit"
            color="primary"
            className="btn-next"
              onClick={() => saveBranch()}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {id !== 0 ? "Update" : "Save"}
            </span>
          </Button>
        </div>
      </Form>
      <CustomAlert
        isOpen={isOpenAlert}
        message={alertMessage}
        severity={alertSeverity}
        handleCloseAlert={() => handleCloseAlert()}
      />
    </Fragment>
  );
};
export default AddEmployee;
