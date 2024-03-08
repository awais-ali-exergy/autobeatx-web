// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import CustomAlert from "../../../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import WizardVertical from "../../../../views/forms/wizard/WizardVertical";
import BreadCrumbs from "@components/breadcrumbs";
import { useTranslation } from "react-i18next";
import AccountDetails from "../../../forms/wizard/steps/AccountDetails";
import OutletDetails from "../../../forms/wizard/steps/OutletDetail";
import SocialLinks from "../../../forms/wizard/steps/SocialLinks";
import { useDispatch } from "react-redux";
import { navigation } from "../../../../redux/navigationSlice";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

const AddEmployee = () => {
  const dispatch = useDispatch();
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
  let params = useParams();
  let id = parseInt(params.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();
  const [designation, setDesignation] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState([]);
  const [branches, setbranches] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);

  const steps = [
    {
      id: "requester_detail",
      title: t("Requester Detail"),
      content: <AccountDetails stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "outlet_detail",
      title: t("Outlet Detail"),
      content: <OutletDetails stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "area_detail",
      title: t("Area Detail"),
      content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
    },
  ];

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firmId: null,
    userId: 0,
    departmentId: "",
    designationId: "",
    customFieldLabel: "",
    customFieldValue: "",
    contactNo: "",
    isAccountNonLocked: "",
    branchId: "",
    cnicNo: "",
    bankAccountNo: "",
    typeId: 0,
    reportingToUserId: "",
    editEmployeeId: "",
    isBranchManager: 0,
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const getDesignation = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetDesignationsDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setDesignation(result.DATA);
        } else {
          toast(
            <p style={{ fontSize: 16 }}>
              {"Failed to fetch ! Please try Again later"}
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
              type: "error",
            }
          );
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later"}
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
            type: "error",
          }
        );
      });
  };
  const getBranches = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetFirmBranchesDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          const updatedBranches = result.DATA.map((branch) => ({
            ...branch,
            value: branch.label,
          }));
          setbranches(updatedBranches);
        } else {
          toast(
            <p style={{ fontSize: 16 }}>
              {"Failed to fetch ! Please try Again later"}
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
              type: "error",
            }
          );
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later"}
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
            type: "error",
          }
        );
      });
  };
  const getDepartments = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetDepartmentsDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setDepartment(result.DATA);
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later"}
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
            type: "error",
          }
        );
      });
  };
  const getemployeeData = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetUsersDropDownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setEmployees(result.DATA);
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later"}
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
            type: "error",
          }
        );
      });
  };
  const getEmployeeDataBySelect = async (empid) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("id", empid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetWithCustomFieldsById`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            // debugger;
            setState({
              userId: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              firmId: data.firmId,
              departmentId: data.departmentId,
              designationId: data.designationId,
              contactNo: data.contactNo,
              branchId: data.branchId,
              cnicNo: data.cnicNo,
              bankAccountNo: data.bankAccountNo,
              isAccountNonLocked: data.isAccountNonLocked,
              typeId: data.typeId,
              reportingToUserId: data.reportingToUserId,
              isBranchManager: data.isBranchManager,
            });

            const updatedBranches = data?.branches?.map((branch) => ({
              ...branch,
              value: branch.label,
            }));

            setSelectedOption([...updatedBranches]);

            setCustomFields([...data.customFields]);
          }
        }
      })
      .catch((error) => {
        // toast(
        //   <p style={{ fontSize: 16 }}>
        //     {"Failed to fetch ! Please try Again later"}
        //   </p>,
        //   {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     newestOnTop: false,
        //     closeOnClick: true,
        //     rtl: false,
        //     pauseOnFocusLoss: true,
        //     draggable: true,
        //     pauseOnHover: true,
        //     type: "error",
        //   }
        // );
      });
  };
  const saveEmployee = async () => {
    var pass = document.getElementById("password").value;
    var confirmpass = document.getElementById("confirmPassword").value;

    if (pass === confirmpass) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("AtouBeatXToken")
      );

      var formdata = new FormData(document.getElementById("employeedata"));
      formdata.append("id", state.userId);
      formdata.append("typeId", state.typeId);
      formdata.append("isBranchManager", state.isBranchManager);
      for (let i = 0; i < selectedOption.length; i++) {
        formdata.append("branchId", selectedOption[i].id);
      }
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      var url = "";
      if (state.userId) {
        url = "/Users/Save";
      } else {
        url = "/Users/SaveInActiveUser";
      }
      await fetch(
        `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}` +
          url,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.SUCCESS === 1) {
            setSelectedOption([]);
            setState({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              firmId: null,
              userId: 0,
              departmentId: "",
              designationId: "",
              customFieldLabel: "",
              customFieldValue: "",
              contactNo: "",
              isAccountNonLocked: "",
              branchId: "",
              cnicNo: "",
              bankAccountNo: "",
              typeId: 0,
              reportingToUserId: "",
              isBranchManager: 0,
            });
            if (id !== 0) {
              toast(<p style={{ fontSize: 16 }}>{"User Updated"}</p>, {
                position: "top-right",
                autoClose: 3000,
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
                navigate("/AddEmployee");
              }
            }, 2000);
          }
          if (result.SUCCESS === 0) {
            toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
              position: "top-right",
              autoClose: 3000,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log("error", error);
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
              type: "error",
            }
          );
          // handleOpenAlert(
          //   <span>Failed to fetch ! Please try Again later.</span>,
          //   "danger"
          // );
        });
    } else {
      toast("New password & confirm password doesn't match");
    }
  };
  useEffect(() => {
    getemployeeData();
    getBranches();
    getDesignation();
    getDepartments();
    let obj = {
      navigationURL: "/Module/102",
      navigationTitle: "Add Employee",
    };
    dispatch(navigation(obj));
    if (id !== 0) {
      getEmployeeDataBySelect(id);
    }
  }, []);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/ViewAllEmployeeData");
  };

  const handleRole = (event) => {
    if (event.target.checked === true) {
      setState({
        ...state,
        isBranchManager: 1,
      });
    } else {
      setState({
        ...state,
        isBranchManager: 0,
      });
    }
  };

  return (
    <Fragment>
      <ToastContainer
      // toastStyle={{ backgroundColor: "#10a945", color: "white" }}
      />

      <Form id="employeedata">
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("First Name")}</Label>
            <Input
              name="firstName"
              id="firstName"
              value={state.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </Col>

          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Last Name")}</Label>
            <Input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              value={state.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Contact No")}</Label>
            <Input
              id="contactNo"
              name="contactNo"
              value={state.contactNo}
              onChange={handleChange}
              placeholder="Contact No"
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("National ID")}</Label>
            <Input
              value={state.cnicNo}
              onChange={handleChange}
              name="cnicNo"
              id="cnicNo"
              placeholder="National ID"
            />
          </Col>

          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Email Address")}</Label>
            <Input
              id="email"
              label="Email Address"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Email Address"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Bank Account")}</Label>
            <Input
              id="bankAccountNo"
              type="textarea"
              name="bankAccountNo"
              value={state.bankAccountNo}
              onChange={handleChange}
              placeholder="Bank Account"
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Department")}</Label>
            <Input
              type="select"
              name="departmentId"
              id="departmentId"
              placeholder="Department"
              value={state.departmentId}
              onChange={handleChange}
            >
              <option></option>
              {department && department.length > 0
                ? department.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>

          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Designation")}</Label>
            <Input
              type="select"
              id="designationId"
              name="designationId"
              value={state.designationId}
              onChange={handleChange}
              placeholder="Designation"
            >
              <option></option>
              {designation && designation.length > 0
                ? designation.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Branch")}</Label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              value={selectedOption}
              onChange={setSelectedOption}
              options={branches}
            />
            {/* <Input
              type="select"
              name="branchId"
              id="branchId"
              value={state.branchId}
              onChange={handleChange}
              label="Branch"
              placeholder="Branch"
            >
              <option></option>
              {branches && branches.length > 0
                ? branches.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input> */}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Password")}</Label>
            <Input
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Confirm Password")}</Label>
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Repoting To")}</Label>
            <Input
              type="select"
              id="reportingToUserId"
              name="reportingToUserId"
              value={state.reportingToUserId}
              onChange={handleChange}
              placeholder="Repoting To"
            >
              <option></option>
              {employees && employees.length > 0
                ? employees.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("User Status")}</Label>
            <Input
              type="select"
              name="isAccountNonLocked"
              id="isAccountNonLocked"
              value={state.isAccountNonLocked}
              onChange={handleChange}
              placeholder="User Status"
            >
              <option value={0}>block</option>
              <option value={1}>Active</option>
            </Input>
          </Col>
          <Col md="12" className="mb-1">
            <Label
              className="form-label"
              style={{
                marginRight: "10px",
              }}
            >
              {t("Branch Manager to be")}
            </Label>
            <Input
              type="checkbox"
              id="isBranchManager"
              name="isBranchManager"
              value={state.isBranchManager}
              onChange={handleRole}
            ></Input>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            onClick={() => handleNavigation()}
          >
            <span className="align-middle d-sm-inline-block d-none">View</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={() => saveEmployee()}
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
