import {Facebook, Instagram, MailOutline,Phone, Pinterest, Room, Twitter,} from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;



const Title = styled.h3`
  margin-bottom: 30px;
`;

const mid = styled.div`
margin-top: 300px;
padding: 200px;

`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <div style={{backgroundColor:' #3d3634 ', color:'white'}}> 
    <Container  >
      <Left>
        <Logo>Ecommerce</Logo>
        <Desc>
          Ecommerce has made it easier for human to reduce physical work and to save time..
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> SURAT GUJARAT
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +91 8660062050
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@eshop.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
    </div>
  );
};
export default Footer;
