import {StyleSheet, Dimensions} from 'react-native';
import {regularButtonStyle} from './button';

// color and fontFamily
import {
  blackColor,
  blackColor2,
  whiteColor,
  purpleMainColor,
  grayColor,
  lightGrayColor,
  purpleColor2,
  redMaroonColor,
  tealGreenColor,
  greenColor,
  lightGrayColor2,
  grayColor2,
} from './colorList';

import {
  MonserratBold,
  MonserratRegular,
  ItimRegular,
  MerriweatherBold,
  MerriweatherRegular,
  OswaldBold,
  OswaldRegular,
  PlayfairDisplayBold,
  PlayfairDisplayRegular,
  RobotoBold,
  RobotoRegular,
  TrispaceBold,
  TrispaceRegular,
} from './fontFamily';

// Get Height and Width with Dimensions for responsive
const {height, width} = Dimensions.get('window');

// Alternative for resposive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * Kalo ada style yang bersifat universal dan ingin dipake di mana aja,
 * tinggal buat object baru lalu dipanggil di halaman yang membutuhkan styles tersebut
 *
 * NOTES:
 * - untuk beberapa style ada yang namanya 50px atau angka terus px ada juga yang cuman angka
 *   bedanya untuk angka + px itu ukurannya tetap / tidak responsive, kalo angka saja berarti responsive
 * - custom font tidak bisa digabung dengan font weight bold
 */

/**
 * All General Style (ex. Font, Font Family, Color)
 */
const fontStyle = {
  fontSizeSm005: {
    fontFamily: MonserratRegular,
    fontSize: width * 0.05,
  },

  headerText: {
    fontFamily: MonserratBold,
    fontSize: width * 0.05,
  },

  subHeaderText: {
    fontFamily: MonserratBold,
    fontSize: width * 0.04,
  },

  subHeaderText2: {
    fontFamily: MonserratBold,
    fontSize: width * 0.035,
  },

  subHeaderText3: {
    fontFamily: MonserratBold,
    fontSize: width * 0.03,
  },

  headerRegulerText2: {
    fontFamily: MonserratRegular,
    fontSize: width * 0.045,
  },

  subHeaderRegulerText: {
    fontFamily: MonserratRegular,
    fontSize: width * 0.04,
  },

  subHeaderRegulerText2: {
    fontFamily: MonserratRegular,
    fontSize: width * 0.035,
  },

  subHeaderRegulerText3: {
    fontFamily: MonserratRegular,
    fontSize: width * 0.03,
  },

  // font size
  fontSize5: {
    // fontFamily: MonserratBold,
    fontSize: width * 0.052,
  },

  fontSize3_5: {
    // fontFamily: MonserratBold,
    fontSize: width * 0.035,
  },

  fontSize4: {
    // fontFamily: MonserratRegular,
    fontSize: width * 0.042,
  },

  // font weight
  fontBold: {
    fontWeight: 'bold',
  },

  fontNormal: {
    fontWeight: 'normal',
  },

  // font family
  fontMonserratBold: {
    fontFamily: MonserratBold,
  },

  fontMonserratRegular: {
    fontFamily: MonserratRegular,
  },

  fontItimRegular: {
    fontFamily: ItimRegular,
  },

  fontMerriweatherBold: {
    fontFamily: MerriweatherBold,
  },

  fontMerriweatherRegular: {
    fontFamily: MerriweatherRegular,
  },

  fontOswaldBold: {
    fontFamily: OswaldBold,
  },
  fontOswaldRegular: {
    fontFamily: OswaldRegular,
  },

  fontPlayfairDisplayBold: {
    fontFamily: PlayfairDisplayBold,
  },

  fontPlayfairDisplayRegular: {
    fontFamily: PlayfairDisplayRegular,
  },

  fontRobotoBold: {
    fontFamily: RobotoBold,
  },

  fontRobotoRegular: {
    fontFamily: RobotoRegular,
  },

  fontTrispaceBold: {
    fontFamily: TrispaceBold,
  },

  fontTrispaceRegular: {
    fontFamily: TrispaceRegular,
  },
};

const fontColorStyles = {
  blackColor: {
    color: blackColor,
  },

  blackColor2: {
    color: blackColor2,
  },

  lightGrayColor: {
    color: lightGrayColor,
  },

  lightGrayColor2: {
    color: lightGrayColor2,
  },

  purpleMainColor: {
    color: purpleMainColor,
  },

  grayColor: {
    color: grayColor,
  },

  whiteColor: {
    color: whiteColor,
  },

  redMaroonColor: {
    color: redMaroonColor,
  },

  tealGreenColor: {
    color: tealGreenColor,
  },

  greenColor: {
    color: greenColor,
  },
};

const opacityStyle = {
  opacity0: {
    opacity: 0,
  },
};

const backgroundColorStyles = {
  redMaroonBackgroundColor: {
    backgroundColor: redMaroonColor,
  },
  greenColorBackgroundColor: {
    backgroundColor: greenColor,
  },
  purpleMainBackgroundColor: {
    backgroundColor: purpleMainColor,
  },
  whiteBackgroundColor: {
    backgroundColor: whiteColor,
  },

  // kartuku select background
  kartukuSelectBoxDefaultBackground: {
    backgroundColor: '#6659A8',
  },

  kartukuSelectBoxNonDefaultBackground: {
    backgroundColor: 'rgba(80, 69, 137, 0.1)',
  },
};

const widthHeightStyles = {
  // width
  width80perc: {
    width: wp('80%'),
  },

  width30perc: {
    width: wp('30%'),
  },

  width10perc: {
    width: wp('20%'),
  },

  width70px: {
    width: 70,
  },

  width200px: {
    width: 200,
  },

  // height

  height40perc: {
    height: hp('40%'),
  },

  height10perc: {
    height: hp('20%'),
  },

  height150px: {
    height: 150,
  },

  height200px: {
    height: 200,
  },

  height70px: {
    height: 70,
  },

  height50px: {
    height: 50,
  },
};

const marginStyles = {
  marginTopMinus: {
    marginTop: height * 0.07 * -1,
  },

  marginTop19perc: {
    marginTop: hp('19.5%'),
  },

  marginTop1: {
    marginTop: height * 0.01,
  },

  marginTop15: {
    marginTop: height * 0.015,
  },

  marginTop30: {
    marginTop: height * 0.03,
  },

  marginTop45: {
    marginTop: height * 0.045,
  },

  marginTop55: {
    marginTop: height * 0.055,
  },

  marginBottom1: {
    marginBottom: height * 0.01,
  },

  marginBottom2: {
    marginBottom: height * 0.02,
  },

  marginBottom3: {
    marginBottom: height * 0.03,
  },

  marginBottom7: {
    marginBottom: height * 0.07,
  },

  marginBottom3px: {
    marginBottom: 3,
  },

  marginBottom15px: {
    marginBottom: 15,
  },

  marginHorizontalMenu_5px: {
    marginHorizontal: 5,
  },
  marginHorizontalMenu_9px: {
    marginHorizontal: 9,
  },
  marginHorizontalMenu_13px: {
    marginHorizontal: 13,
  },

  marginHorizontalMenu_5: {
    marginHorizontal: width * 0.05,
  },

  marginVertical3px: {
    marginVertical: 3,
  },
  marginVertical20px: {
    marginVertical: 20,
  },

  marginVertical15: {
    marginVertical: height * 0.015,
  },

  marginLeftAuto: {
    marginLeft: 'auto',
  },

  marginLeft2: {
    marginLeft: width * 0.02,
  },

  marginLeft5: {
    marginLeft: width * 0.05,
  },

  marginHorizontalMenu_10: {
    marginHorizontal: width * 0.05,
  },

  // margin right
  marginRight5: {
    marginRight: width * 0.05,
  },
  marginRight2: {
    marginRight: width * 0.02,
  },
};

const paddingStyles = {
  paddingHorizontal7: {
    paddingHorizontal: width * 0.07,
  },

  paddingVertical5px: {
    paddingVertical: 5,
  },

  paddingBottom1: {
    paddingBottom: height * 0.01,
  },

  paddingBottom10: {
    paddingBottom: height * 0.1,
  },

  padding8px: {
    padding: 8,
  },

  // padding top
  paddingTop2: {
    paddingTop: height * 0.02,
  },
};

const flexStyles = {
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },

  flex3: {
    flex: 3,
  },

  flex4: {
    flex: 4,
  },

  flex1DirectionRow: {
    flex: 1,
    flexDirection: 'row',
  },

  flexDirectionRow: {
    flexDirection: 'row',
  },

  flexDirectionColumn: {
    flexDirection: 'column',
  },

  flex1DirectionColumn: {
    flex: 1,
    flexDirection: 'column',
  },

  flex1DirectionRowReverse: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },

  flexWrap: {
    flexWrap: 'wrap',
  },

  flexShrink1: {
    flexShrink: 1,
  },

  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfFlexEnd: {
    alignSelf: 'flex-end',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end',
  },

  justifyContentSpaceAround: {
    justifyContent: 'space-evenly',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },

  justifyContentCenter: {
    justifyContent: 'center',
  },

  // position
  positionRelative: {
    position: 'relative',
  },
};

const borderStyles = {
  borderLightGray1px: {
    borderBottomWidth: 1,
    borderColor: lightGrayColor,
  },

  borderAllPurpleMain5px: {
    borderWidth: 5,
    borderColor: purpleMainColor,
  },

  borderRadius0: {
    borderRadius: 0,
  },
  borderWidth0: {
    borderWidth: 0,
  },
  borderRadiusWidth0: {
    borderWidth: 0,
    borderRadius: 0,
  },

  borderRadius50perc: {
    borderRadius: wp('50%'),
  },
};

/* 
  All Component Style
  Penamaan styling = Camel Case ex. loginContainer, buttonLogIn 
  atau buttonJoinSekarang
*/

const buttonStyles = {
  buttonBottomStyles: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.03,
  },

  blackButton: {
    ...regularButtonStyle,
    backgroundColor: blackColor,
    fontSize: 14,
  },

  whiteButtonWithBorder: {
    ...regularButtonStyle,
    backgroundColor: whiteColor,
    alignItems: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderColor: lightGrayColor2,
  },

  purpleMainButton: {
    ...regularButtonStyle,
    backgroundColor: purpleMainColor,
    marginTop: height * 0.025,
    fontSize: 14,
  },

  lightGrayColor2Button: {
    ...regularButtonStyle,
    backgroundColor: lightGrayColor2,
    marginTop: height * 0.025,
    fontSize: 14,
  },

  greenBottomButton: {
    alignItems: 'center',
    backgroundColor: greenColor,
    fontSize: 14,
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.025,
  },

  lightGrayColor2BottomButton: {
    alignItems: 'center',
    backgroundColor: lightGrayColor2,
    fontSize: 14,
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.025,
  },
};

const textInputStyle = {
  containerStyle: {
    marginBottom: height * 0.04,
  },
  marginHorizontalContainer: {
    marginHorizontal: 10,
  },
  labelTextInputStyle: {
    fontFamily: MonserratBold,
    color: blackColor,
    fontSize: 14,
  },

  textInputStyleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderColor: purpleMainColor,
    backgroundColor: 'transparent',
  },

  textInputStyle: {
    fontFamily: MonserratBold,
    backgroundColor: 'transparent',
    color: purpleMainColor,
    fontSize: 14,
  },

  textInputWithAllBorder: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: lightGrayColor2,
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingHorizontal: 16,
  },

  textTransformCapitalize: {
    textTransform: 'capitalize',
  },

  textAlignVerticalTop: {
    textAlignVertical: 'top',
  },
};

const KImageMenuStyles = {
  containerMenuStyle: {
    width: wp('17%'),
    marginBottom: 20,
  },
  containerMenuViewStyle: {
    borderRadius: 50,
    height: 65,
    width: wp('16%'),
  },

  containerKartukuMenuStyle: {
    width: 65,
    marginBottom: 20,
  },
  containerKartukuMenuViewStyle: {
    borderRadius: 50,
    height: 65,
    width: 65,
  },

  imageMenuStyle: {
    height: 65,
  },

  textMenuStyle: {
    textAlign: 'center',
    fontSize: 8.5,
    fontFamily: MonserratBold,
  },

  topUpKuMenuStyle: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 10,
    fontFamily: MonserratBold,
  },

  komunitasMenuStyle: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 8.5,
    fontFamily: MonserratBold,
  },

  kartukuMenuBorderRadius50: {
    borderRadius: 50,
  },

  kartukuShareMeIconStyle: {
    ...flexStyles.alignSelfCenter,
    width: 50,
    height: 50,
  },
  kartukuShareMeTextMenuStyle: {
    marginTop: -5,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: MonserratBold,
  },
  kartukuBackgroundWhite: {
    backgroundColor: whiteColor,
  },
};

const sliderStyles = {
  homeSlider: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    marginTop: height * 0.05,
    position: 'relative',
  },

  homePaginationStyle: {
    position: 'absolute',
    top: hp('12.5%'),
    left: wp('40%'),
  },

  homePaginationDotsStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: -10,
  },
};

const KTabStyles = {
  containerTabStyle: {
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: lightGrayColor,
  },

  bottomTabIconStyle: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
    backgroundColor: whiteColor,
    paddingTop: 8,
  },

  middleBottomTabIconStyle: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 2,
    backgroundColor: '#6659A8',
    paddingTop: 15,
  },

  textBottomTablIconLabel: {
    color: blackColor,
    fontSize: 11,
    marginTop: 2,
    fontFamily: MonserratRegular,
  },
};

const KCardComponentStyles = {
  containerDefaultCardComponent: {
    borderColor: grayColor,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },

  imageDefaultCardStyle: {
    height: 95,
    width: 95,
    marginRight: 10,
  },

  imageDetailComunnityCardStyle: {
    height: 120,
    width: 120,
    marginRight: 15,
  },
};

/* 
  All Section Style
  Penamaan styling = Camel Case ex. loginContainer, buttonLogIn 
  atau buttonJoinSekarang
*/

const welcomeStyles = {
  welcomeContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: height * 0.07,
  },

  welcomeLogo: {
    width: 120,
    height: 47,
    marginBottom: height * 0.11,
  },

  subWelcomeText: {
    fontFamily: MonserratRegular,
    fontSize: 14,
    marginBottom: height * 0.1,
    width: 192,
  },

  welcomeText: {
    fontFamily: MonserratRegular,
    fontSize: 24,
    marginBottom: height * 0.06,
    width: 193,
  },

  loginButtonText: {
    color: whiteColor,
    fontFamily: MonserratBold,
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  joinButtonText: {
    color: whiteColor,
    fontFamily: MonserratBold,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
};

const loginStyles = {
  loginContainer: {
    marginTop: height * 0.1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: height * 0.3,
  },

  forgotPasswordStyleContainer: {
    flex: 1,
  },
  forgotPasswordTextStyle: {
    fontSize: 10,
    fontFamily: MonserratBold,
    color: purpleMainColor,
  },
};

const registerStyles = {
  registerContainer: {
    marginTop: height * -0.27,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: height * 0.3,
    paddingBottom: height * 0.1,
    backgroundColor: whiteColor,
  },

  registerTitleStyle: {
    fontFamily: MonserratBold,
    fontSize: 20,
    marginBottom: height * 0.06,
    // width: ,
  },

  registerButton: {
    ...regularButtonStyle,
    backgroundColor: purpleMainColor,
    // marginTop: height * 0.00,
    fontSize: 14,
  },
};

const homeStyles = {
  homeContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: height * 0.04,
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: whiteColor,
  },

  homeLogo: {
    width: 130,
    height: 47,
  },
};

const cameraStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: blackColor,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
};

const komunitasStyles = {
  komunitasContainer: {
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: height * 0.03,
    marginLeft: width * 0.09,
  },

  containerKomunitasMenuStyle: {
    width: wp('25%'),
    marginBottom: 20,
  },

  imageKomunitasMenuStyle: {
    borderRadius: 20,
    height: 95,
  },

  // Detail Komunitas Screen Style
  coverBackgroundDetailKomunitas: {
    backgroundColor: lightGrayColor,
    height: height * 0.225,
  },

  containerLogoDetailKomunitasMenuViewStyle: {
    borderRadius: 20,
    height: 105,
    width: 105,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: whiteColor,
  },

  logoDetailKomunitasMenuStyle: {
    borderRadius: 15,
    height: 95,
  },

  containerSectionDetailKomunitasAnggota: {
    alignItems: 'center',
    backgroundColor: purpleColor2,
    fontSize: 14,
    paddingHorizontal: width * 0.15,
    paddingVertical: height * 0.02,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  containerSectionDetailKomunitasButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  containerSectionDetailKomunitasJoinButton: {
    alignItems: 'center',
    backgroundColor: purpleMainColor,
    flex: 1,
    fontSize: 14,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.03,
    borderRadius: 5,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: purpleMainColor,
    justifyContent: 'center',
    marginHorizontal: wp('0.5%'),
    height: hp('5%'),
    width: wp('10%'),
  },

  containerSectionDetailKomunitasCountMemberButton: {
    alignItems: 'center',
    backgroundColor: whiteColor,
    flex: 1,
    fontSize: 14,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.03,
    borderRadius: 5,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: grayColor2,
    justifyContent: 'center',
    marginHorizontal: wp('0.5%'),
    height: hp('5%'),
    width: wp('10%'),
  },

  containerSectionDetailKomunitasVerifikasiButton: {
    alignItems: 'center',
    backgroundColor: grayColor2,
    flex: 1,
    fontSize: 14,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.03,
    borderRadius: 5,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: grayColor2,
    justifyContent: 'center',
    marginHorizontal: wp('0.5%'),
    height: hp('5%'),
    width: wp('10%'),
  },

  containerGalleryDetailKomunitasStyle: {
    width: width * 0.145,
  },

  imageGalleryDetailKomunitasStyle: {
    borderRadius: 6,
    width: width * 0.145,
    height: width * 0.145,
  },
};

const kartukuStyles = {
  kartukuMainContainer: {
    paddingVertical: height * 0.05,
    paddingHorizontal: height * 0.05,
    marginBottom: 30,
  },

  kartukuMainContainerKomunitasku: {
    paddingVertical: height * 0.01,
    paddingHorizontal: height * 0.05,
    marginBottom: 30,
  },

  kartukuMainContainerFit: {
    paddingVertical: height * 0.02,
    paddingHorizontal: height * 0.02,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },

  kartukuBoxContainer: {
    // Shadow suddenly works here. #confused
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,

    borderWidth: 1,
    borderColor: lightGrayColor,
    // width: width * 0.93,
    height: height * 0.74,
  },

  kartukuWhiteBoxContainer: {
    backgroundColor: whiteColor,
    paddingTop: 25,
    paddingBottom: 15,
    paddingLeft: width * 0.1,
    paddingRight: 0,
    height: height * 0.25,
    zIndex: 2,
  },

  kartukuTopCylinderPurpleBoxContainer: {
    backgroundColor: purpleMainColor,
    height: 70,
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },

  kartukuBackgroundStyle: {
    backgroundColor: whiteColor,
    width: wp('92%'),
    height: height * 0.65,
  },

  kartukuPurpleBoxContainer: {
    backgroundColor: purpleMainColor,
    height: height * 0.54,
    elevation: 0,
  },

  kartukuPurpleMenuBoxContainer: {
    position: 'absolute',
    top: height * 0.1,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  kartukuSelectBoxContainer: {
    width: wp('92%'),
    position: 'absolute',
    top: height * 0.42,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 5,
  },

  kartukuSelectButton: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.035,
  },

  // kartuku profile
  kartukuMainProfilePicStyle: {
    borderRadius: 100,
    height: 100,
    marginBottom: 11,
    width: 100,
  },
  kartukuMainProfilePicContainer: {
    alignItems: 'center',
  },

  kartukuIconLocationContainer: {
    paddingTop: 3,
    marginRight: 5,
  },

  kartukuDownloadButtonStyle: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#6659A8',
    fontSize: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,

    // if button has a icon use this style.
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  kartukuDownloadButtonTextStyle: {
    color: whiteColor,
    fontFamily: MonserratBold,
    marginLeft: 6,
  },

  kartukuMainFlatListContainer: {
    paddingTop: height * 0.05,
    paddingHorizontal: height * 0.025,
  },

  kartukuLinksProfileContainer: {
    paddingHorizontal: height * 0.025,
  },

  // kartuku Profile Screen
  kartukuProfileScreenPicStyle: {
    borderRadius: 90,
    height: 90,
    marginBottom: 11,
    width: 90,
  },

  // kartuku Business Screen and Komunitas

  kartukuCardContainer: {
    paddingBottom: 15,
    marginBottom: 15,
  },

  kartukuCardImageStyle: {
    borderRadius: 5,
    height: 60,
    marginBottom: 11,
    marginRight: 15,
    width: 60,
  },

  // kartuku Share Me Style
  kartukuShareMeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.03,
  },

  // kartuku Bottom Button Style
  kartukuBottomButtonStyle: {
    alignItems: 'center',
    backgroundColor: whiteColor,
    flex: 1,
    fontSize: 14,
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.05,
    borderRadius: 10,
  },

  kartukuTitleMenuStyle: {
    textAlign: 'center',
    fontSize: width * 0.025,
  },
};

const articleStyles = {
  articleMainImageStyle: {
    width: 290,
    height: 200,
  },

  containerArticleStyleButton: {
    alignItems: 'center',
    backgroundColor: whiteColor,
    flex: 1,
    fontSize: 14,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.03,
    borderRadius: 5,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: purpleMainColor,
    justifyContent: 'center',
    marginHorizontal: wp('0.5%'),
    height: hp('5%'),
    // width: wp('10%'),
  },
};

const promoStyles = {
  promoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  promoCardContainer: {
    width: wp('90%'),
    height: hp('33.5%'),
    borderRadius: wp('5%'),
  },
  promoMainImage: {
    width: wp('89.6%'),
    height: hp('20%'),
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    elevation: wp('0.5%'),
    marginLeft: wp('0.2%'),
    zIndex: 1,
  },
  promoMainInfo: {
    width: wp('90%'),
    height: hp('13.4%'),
    borderBottomLeftRadius: wp('4%'),
    borderBottomRightRadius: wp('4%'),
    paddingLeft: wp('5%'),
    paddingTop: hp('1.5%'),
    elevation: wp('0.25%'),
    marginTop: hp('-0.20%'),
  },
  promoTitleText: {
    fontFamily: MonserratRegular,
    fontSize: wp('3.8%'),
  },
  promoPeriodTime: {
    flexDirection: 'row',
    marginTop: hp('2%'),
  },
  promoPeriodTimeIcon: {
    width: wp('11%'),
    height: hp('5.5%'),
  },
  promoPeriodPromoText: {
    fontFamily: MonserratRegular,
    color: lightGrayColor2,
  },
  promoDateText: {
    fontFamily: MonserratRegular,
  },
  promoBannerImage: {
    width: wp('89.6%'),
    height: hp('20%'),
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
  },
};

const topUpKuStyles = {
  topUpKuContainer: {
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.03,
  },
  topUpKuSubContainer: {
    paddingHorizontal: wp('5%'),
    marginBottom: 30,
  },
  pulsaMenuBoxContainer: {
    width: wp('40%'),
    height: hp('12.5%'),
    marginBottom: 20,
    backgroundColor: grayColor2,
    borderRadius: 20,
    paddingLeft: 16,
    paddingTop: 20,
    marginLeft: wp('3%'),
  },
  pulsaMenuText: {
    color: whiteColor,
    fontSize: 24,
    fontFamily: MonserratRegular,
    fontWeight: '700',
  },
  pulsaPriceText: {
    color: whiteColor,
    fontSize: 14,
    fontFamily: MonserratBold,
    fontWeight: '600',
  },
  pulsaButtonContainer: {
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: height * 0.03,
  },
  TInputPulsaTextInput: {
    borderWidth: wp('0.25'),
    borderRadius: 10,
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  TInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    right: wp('-3%'),
  },

  TInputContainerNew: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: lightGrayColor2,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
  },

  TInputIcon: {
    left: wp('-14%'),
  },
  TInputProviderIcon: {
    left: wp('-16%'),
  },
  TCardMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('11.5%'),
    paddingHorizontal: wp('3.5%'),
    borderBottomWidth: wp('0.1%'),
  },
  TCardMenuLeftComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TCardMenuText: {
    fontFamily: MonserratBold,
    fontSize: wp('4.5%'),
    fontWeight: '700',
    marginLeft: wp('3%'),
  },
};

const TSwipeableStyle = {
  descContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  dividerStyle: {
    marginVertical: 5,
    paddingVertical: 10,
  },
  mainContainer: {
    // backgroundColor: 'orange',
    height: Dimensions.get('window').height - 125,
    flex: 1,
  },
  mainHeaderContainer: {
    marginVertical: 10,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  providerText: {
    marginRight: 12.5,
  },
  purchaseButtonContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  secondaryHeaderContainer: {
    marginHorizontal: 10,
    marginVertical: 7.5,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeaderText2: {
    fontFamily: MonserratBold,
    fontSize: width * 0.035,
  },
  textBold: {
    fontWeight: '700',
    fontFamily: MonserratBold,
  },
  whiteColor: {
    color: whiteColor,
  },
  itemSpacing: {
    marginVertical: 5,
  },
};

const topUpPaketDataStyles = {
  descContainer: {
    // flexWrap: 'wrap',
    marginVertical: 2,
    width: '100%',
  },
  icon: {
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    height: 45,
    marginRight: 15,
    width: 45,
  },
  itemContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    // alignItems: 'center',
  },
  packageName: {
    // fontWeight: 'bold',
    fontFamily: MonserratBold,
    fontSize: 16,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
  },
};

const topUpListrikOptionsStyle = {
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    alignItems: 'center',

    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    marginHorizontal: 4,
    marginVertical: 10,
    width: Dimensions.get('screen').width / 2 - 10,
  },
  textStyle: {
    color: whiteColor,
    fontFamily: MonserratBold,
  },
};

const styles = StyleSheet.create({
  // Dummy slider style]

  carouselItemStyle: {
    backgroundColor: lightGrayColor,
    borderRadius: 5,
    height: 150,
    padding: 50,
    width: width * 0.85,
  },

  center: {
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: height * 0.03,
  },

  containerCarouselStyle: {
    flex: 1,
    justifyContent: 'center',
    // marginLeft: width * -0.07,
    // marginRight: width * 0.1,
  },

  defaultCenter: {
    alignItems: 'center',
    flex: 1,
  },

  //* End Dummy slider styles */
  headerCenterStyle: {
    // alignSelf: 'center',
    fontFamily: MonserratBold,
    fontSize: 14,
    fontWeight: 'normal',
  },

  headerHeight: {
    height: height * 0.15,
  },

  headerLeftStyle: {
    marginLeft: width * 0.09,
  },

  headerMain: {
    backgroundColor: whiteColor,
    height: height * 0.1,
  },

  headerNoShadow: {
    elevation: 0,
    shadowOpacity: 0,
  },

  headerPurple: {
    backgroundColor: purpleMainColor,
    height: height * 0.1,
  },

  headerRightStyle: {
    marginRight: width * 0.09,
  },

  headerWhiteStyle: {
    fontFamily: MonserratBold,
    fontSize: 14,
    fontWeight: 'normal',
    marginLeft: 'auto',
    marginRight: width * 0.05,
  },

  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginVertical: height * 0.35,
  },

  sectionMenuMargin: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.025,
    paddingBottom: 0,
    paddingVertical: 15,
  },

  sectionSubMenuMargin: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 30,
  },

  // All General Style
  ...fontStyle,
  ...marginStyles,
  ...fontColorStyles,
  ...flexStyles,
  ...paddingStyles,
  ...borderStyles,
  ...opacityStyle,
  ...backgroundColorStyles,
  ...widthHeightStyles,

  // All Component Style Destruction
  ...textInputStyle,
  ...KImageMenuStyles,
  ...sliderStyles,
  ...KTabStyles,
  ...KCardComponentStyles,
  ...buttonStyles,

  // Welcome Screen Styles
  ...welcomeStyles,

  // Login Screen Styles
  ...loginStyles,

  // Register Screen Styles
  ...registerStyles,

  // Home Screen Styles
  ...homeStyles,

  // Camera Screen Styles
  ...cameraStyles,

  // Komunitas Screen Styles
  ...komunitasStyles,

  // Kartuku Screen Styles
  ...kartukuStyles,

  // Article Screen Styles,
  ...articleStyles,

  // Promo Screen Styles
  ...promoStyles,

  // TopUpku Screen Styles
  ...topUpKuStyles,

  // TSwipeable Screen Styles
  ...TSwipeableStyle,

  // TopUpPaketData Screen Styles
  ...topUpPaketDataStyles,

  // TopUpListrikOptions Screen Styles
  ...topUpListrikOptionsStyle,
});

export default styles;
