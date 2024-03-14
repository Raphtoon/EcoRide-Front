import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  unsetLoader,
} from "../slices/authSlice";
import axios from "axios";

const ProtectRoute = ({ children }) => {
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getUserInfos();
  }, []);

  const getUserInfos = async () => {
    dispatch(loginStart());
    try {
      const res = await axios.get(
        `https://localhost:7019/api/Authentication/persistLogin`
      );
      if (isMounted.current) {
        dispatch(loginSuccess(res.data.details));
      }
    } catch (error) {
      if (isMounted.current) {
        dispatch(loginFailure("Connectez-vous pour accéder à cette page"));
      }
    }
  };

  const checkAuth = () => {
    if (!user && !loading) {
      navigate("/login");
      return null;
    } else {
      return <Fragment>{children}</Fragment>;
    }
  };

  return checkAuth();
};

export default ProtectRoute;
