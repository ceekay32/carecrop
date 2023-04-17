import React from "react";
import styled from "styled-components";
// Assets
import RollerIcon from "../../assets/svg/Services/RollerIcon";
import MonitorIcon from "../../assets/svg/Services/MonitorIcon";
import BrowserIcon from "../../assets/svg/Services/BrowserIcon";
import PrinterIcon from "../../assets/svg/Services/PrinterIcon";
import Mosquito from "../../assets/svg/Services/Mosquito1.jpg";
import Apple from "../../assets/svg/Services/Apple.jpg";
import Fertilizer from "../../assets/svg/Services/fertilizer-color-icon.jpg";
import Crop from "../../assets/svg/Services/Crop.jpg";

export default function ServiceBox({ icon, title, subtitle }) {
  let getIcon;

  switch (icon) {
    // case "roller":
    //   getIcon = <RollerIcon />;
    //   break;
    // case "monitor":
    //   getIcon = <MonitorIcon />;
    //   break;
    // case "browser":
    //   getIcon = <BrowserIcon />;
    //   break;
    // case "printer":
    //   getIcon = <PrinterIcon />;
    //   break;
    case "mosquito":
      getIcon = <img src={Mosquito}></img>;
      break;
    case "apple":
      getIcon = <img src={Apple}></img>;
      break;
    case "fertilizer":
      getIcon = <img src={Fertilizer}></img>;
      break;
    case "crop":
      getIcon = <img src={Crop}></img>;
      break;
    default:
      getIcon = <RollerIcon />;
      break;
  }

  return (
    <Wrapper className="flex flexColumn animate pointer">
      <IconStyle>{getIcon}</IconStyle>
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font13">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
