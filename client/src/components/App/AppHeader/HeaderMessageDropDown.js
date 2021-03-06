import React from "react";
import { MenuList, Box } from "@material-ui/core";
import MenuWrapper from "./MenuWrapper";
import MessageCard from "../../MessageCard";
import { GET_AUTH_USER } from "../../../graphql/user";
import { useStore } from "../../../store";
import { GET_CONVERSATIONS, UPDATE_ALL_MESSAGES_AS_SEEN } from "../../../graphql/message";
import { useMutation } from "@apollo/client";
import MessageUsers from "../../../pages/Message/MessageUsers";

const HeaderMessageDropDown = ({
  isOpen,
  messageAnchorEl,
  closeMenu,
  dropDownData,
}) => {

  const [{ auth }] = useStore();
  const [update, { loading }] = useMutation(UPDATE_ALL_MESSAGES_AS_SEEN, {
    variables:{
      input: {
        receiver: auth.user.id
      }
    },
    refetchQueries:[
      { query: GET_AUTH_USER },
      { query: GET_CONVERSATIONS, variables: {
        authUserId: auth.user.id
      }}
    ]
  });

  React.useEffect(() => {
    console.log("MESSAGE DATA", dropDownData);
  }, [dropDownData]);

  React.useEffect(() => {
    const updateMessages = async () => {
      try{
        await update();
      } catch(e){
        console.log(e)
      }
    };
    if(dropDownData.length > 0){
      updateMessages();
    }
  }, [dropDownData]);

  return (
    <MenuWrapper
      isOpen={isOpen}
      anchorEl={messageAnchorEl}
      closeMenu={closeMenu}
      dropDownData={dropDownData}
    >
      { dropDownData.length > 0 ?
        <MenuList>
          {dropDownData.map((u) => {
            return <MessageCard loadin={loading} user={u} />;
          })}
        </MenuList> :
        <MessageUsers closeMenu={closeMenu} />
        }

    </MenuWrapper>
  );
};

export default HeaderMessageDropDown;
