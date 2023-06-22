import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
// import PersonalWidget from "scenes/widgets/PersonalWidget";
import CompoundFractionWidget from "scenes/widgets/cf";
import CalendarWidget from "scenes/widgets/CalendarWidget";
import CompoundFrac from "scenes/widgets/CompoundFrac";
import React from 'react';
import { Link } from 'react-router-dom'

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Box m="2rem 0"/>
          <CalendarWidget/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          { <PostsWidget userId={_id} /> }
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <Link to="/home/fraction">
              <img src="https://i.pinimg.com/236x/f5/83/a7/f583a7cb1ecdf44de11f5ac964cb972a.jpg" alt="Clickable Image" style={{ width: '200px', height: 'auto' }} />
            </Link>
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
            {/* <Box m="2rem 0"/>
            <CompoundFrac/> */}
            <Box m="2rem 0"/>
            <CompoundFractionWidget/>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
