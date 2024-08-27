import React, { useEffect, useState } from "react";
import Button from "../button/button";
import { useFormManager } from "../../Context/FormManagerContext";
import WrapperContainer from "../WrapperContainer/WrapperContainer";
import { useSnackbar } from "notistack";

const FormBase = ({ children, actionList, closeButton, ...props }) => {
  const { setOpen } = useFormManager();
  const [buttonList, setButtonList] = useState();
  const [validationRefList, setValidationRefList] = useState({});
  const [childrenRefList, setChildrenRefList] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let counter = 0;

  const fillRef = (childrenTree) => {
    return React.Children.map(childrenTree, (child, index) => {
      if (React.isValidElement(child)) {
        let subChildren = child.props.children;

        const name = child.props.name || `component-${counter++}`; // ex: component-2 customerInput-4

        const additionalProps = {
          name,
        };

        if (React.Children.count(child.props.children) > 0) {
          subChildren = fillRef(child.props.children);
          return React.cloneElement(
            child,
            {
              ...child.props,
              ...additionalProps,
            },
            subChildren
          );
        } else {
          const childRef = child.ref || React.createRef();
          childrenRefList[name] = childRef;

          if (child.props.required) {
            validationRefList[name] = childRef;
          }
          const additionalPropsWithRef = {
            ...child.props,
            ...additionalProps,
            ref: childRef,
          };

          return React.cloneElement(child, additionalPropsWithRef, subChildren);
        }
      }
      return child;
    });
  };

  const newChildren = fillRef(children);

  const preValidation = (onClick) => {
    let resultValid = true;
    Object.values(validationRefList).map((validateRef) => {
      if (
        validateRef.current &&
        validateRef.current.validate &&
        validateRef.current.validate() === false
      ) {
        resultValid = false;
      }
    });
    if (!resultValid) {
      enqueueSnackbar("Lütfen tüm zorunlu alanları doldurunuz", "warning");
      return;
    }
    onClick && onClick();
  };

  useEffect(() => {
    actions();
  }, [actionList]);

  const actions = () => {
    if (actionList?.length > 0) {
      setButtonList(
        actionList.map((item, index) => {
          return (
            <Button
              xs={item?.xs}
              label={item?.label}
              variant={item?.variant}
              onClick={() =>
                item?.type === "validate"
                  ? preValidation(item?.onClick)
                  : item?.onClick && item.onClick()
              }
              userType={item.userType}
            />
          );
        })
      );
    }
  };

  return (
    <div className={props?.className}>
      <WrapperContainer>{newChildren}</WrapperContainer>
      <WrapperContainer justifyContent={"flex-end"}>
        {!closeButton && (
          <Button
            label="Kapat"
            onClick={() => {
              setOpen(false);
            }}
          />
        )}
        {buttonList}
      </WrapperContainer>
    </div>
  );
};

export default FormBase;
