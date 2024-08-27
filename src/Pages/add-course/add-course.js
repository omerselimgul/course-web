import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, WrapperContainer } from "../../Base";
import { UseApi } from "../../Context/Api/useApi";
import { useSnackbar } from "notistack";
import FormBase from "../../Base/form-base/form-base";
import apiUrls from "../../Constant/apiurls/apiurls";
import ExcelReader from "../../Base/excel-reader/excel-reader";
import SelectInput from "../../Base/select/select";
import { useParams } from "react-router-dom";
import DatePicker from "../../Base/date/date";
import CourseGrid from "../../Components/CourseGrid/CourseGrid";
import FileUpload from "../../Base/file-upload/file-upload";

const AddCourse = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { executeAsync, executeGet } = UseApi();
  const { courseid } = useParams();

  const [dataSource, setDataSource] = useState({});
  const [educators, setEducators] = useState([]);

  const courseDocumentRef = useRef();
  const coordinatorRef = useRef();
  const minimumQuotaRef = useRef();
  const maximumQuotaRef = useRef();
  const documentTypeRef = useRef();
  const courseCodeRef = useRef();
  const registerBeginDateRef = useRef();
  const registerEndDateRef = useRef();
  const courseBeginDateRef = useRef();
  const courseEndDateRef = useRef();
  const purposeRef = useRef();
  const descriptionRef = useRef();
  const educatorRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    executeGet({ url: apiUrls.Educators }).then((response) => {
      setEducators(response.data);
    });
  }, []);

  useEffect(() => {
    if (courseid) {
      executeGet({ url: apiUrls.Courses + `/${courseid}` }).then((res) => {
        let newObje = {};
        Object.keys(res.data).map((x) => {
          const field = x[0].toUpperCase() + x.slice(1);
          newObje = {
            ...newObje,
            [field]: res.data[x],
          };
        });
        setDataSource(newObje);
      });
    }
  }, [courseid]);

  const saveClick = async () => {
    let CourseDetails = gridRef.current && gridRef.current.value;
    const courseDocumentId = courseDocumentRef.current && (await courseDocumentRef.current.save());
    const paylaod = {
      Name: dataSource.Name,
      CourseCode: courseCodeRef.current && courseCodeRef.current.value,
      Coordinator: coordinatorRef.current && coordinatorRef.current.value,
      MinimumQuota: minimumQuotaRef.current && minimumQuotaRef.current.value,
      MaximumQuota: maximumQuotaRef.current && maximumQuotaRef.current.value,
      Description: descriptionRef.current && descriptionRef.current.value,
      DocumentType: documentTypeRef.current && documentTypeRef.current.value,
      RegisterBeginDate: registerBeginDateRef.current && registerBeginDateRef.current.value,
      RegisterEndDate: registerEndDateRef.current && registerEndDateRef.current.value,
      CourseBeginDate: courseBeginDateRef.current && courseBeginDateRef.current.value,
      CourseEndDate: courseEndDateRef.current && courseEndDateRef.current.value,
      PurposeOfCourse: purposeRef.current && purposeRef.current.value,
      CourseDocument: courseDocumentId || dataSource?.courseDocument,
      CourseEducaterId: educatorRef.current && educatorRef.current.value,
    };
    const _coursedetail = CourseDetails.map((item) => {
      if (item.id == null) item.id = 0;
      return item;
    });
    paylaod["CourseDetails"] = _coursedetail;
    if (courseid) {
      paylaod.Id = courseid;
      executeAsync({
        url: apiUrls.Courses + `/${courseid}`,
        method: "PUT",
        data: paylaod,
        spinner: true,
      }).then((res) => {
        if (res?.success) {
          enqueueSnackbar("Kurs kaydı başarıyla tamamlandı", {
            variant: "success",
          });
        }
      });
    } else {
      executeAsync({
        url: apiUrls.Courses,
        method: "POST",
        data: paylaod,
        spinner: true,
      }).then((res) => {
        if (res?.success) {
          enqueueSnackbar("Kurs kaydı başarıyla tamamlandı", {
            variant: "success",
          });
        }
      });
    }
  };

  const getExcelData = (data, header) => {
    // setDataSource({ ...dataSource, Name: header });
  };

  const changeHandler = (field, value) => {
    setDataSource({ ...dataSource, [field]: value });
  };

  const actionList = [
    {
      label: "Kaydet",
      onClick: saveClick,
      type: "validate",
    },
  ];

  return (
    <div className="LayoutInnerContainer">
      <FormBase closeButton actionList={actionList}>
        <WrapperContainer margin={"8px 0px"} padding={"0px 8px"}>
          <h2 xs={12}>Genel Bilgileri</h2>
          <Input
            required
            xs={6}
            label={"Kurs ismi"}
            value={dataSource?.Name}
            onBlur={(value) => {
              changeHandler("Name", value);
            }}
          />

          <Input required ref={coordinatorRef} xs={3} label={"Koordinatör"} value={dataSource?.Coordinator} />
          <Input ref={minimumQuotaRef} xs={1.5} label={"Min kontejan"} type="number" value={dataSource?.MinimumQuota} />
          <Input ref={maximumQuotaRef} xs={1.5} label={"Max kontejan"} type="number" value={dataSource?.MaximumQuota} />
          <Input ref={documentTypeRef} xs={3} label={"Belge Türü"} value={dataSource?.DocumentType} />
          <Input ref={courseCodeRef} xs={3} label={"Eğitim Kodu"} value={dataSource?.CourseCode} />
          <DatePicker ref={registerBeginDateRef} xs={3} label={"Kayıt dönemi başlangıç"} value={dataSource?.RegisterEndDate} />
          <DatePicker ref={registerEndDateRef} xs={3} label={"Kayıt dönemi bitiş"} value={dataSource?.RegisterEndDate} />
          <DatePicker ref={courseBeginDateRef} xs={3} label={"Eğitim dönemi başlangıç"} value={dataSource?.CourseBeginDate} />
          <DatePicker ref={courseEndDateRef} xs={3} label={"Eğitim dönemi bitiş"} value={dataSource?.CourseEndDate} />
          <SelectInput
            ref={educatorRef}
            xs={6}
            title={"Yetkili öğretmen"}
            valuePath="id"
            labelPath="firstName"
            dataSource={educators}
            value={dataSource?.CourseEducaterId}
          />
          <Input multiline ref={descriptionRef} value={dataSource?.Description} rows={6} xs={6} label={"Eğitimin tanıtımı"} />
          <Input multiline ref={purposeRef} value={dataSource?.PurposeOfCourse} rows={6} xs={6} label={"Eğitimin amacı"} />
        </WrapperContainer>
        <hr xs={12} />
        <WrapperContainer xs={12}>
          <FileUpload ref={courseDocumentRef} xs={4} value={dataSource?.CourseDocument} name="highSchoolFile" label={"Kurs metaryel "} />
        </WrapperContainer>
        <CourseGrid ref={gridRef} source={dataSource.CourseDetails} xs={12} />
      </FormBase>
    </div>
  );
};
export default AddCourse;
