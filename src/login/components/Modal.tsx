// import {
//   Modal,
//   Box,
//   Typography,
//   ModalProps as MuiModalProps,
//   Grow,
//   IconButton,
//   useTheme,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// interface CustomModalProps extends Pick<MuiModalProps, "open" | "onClose"> {
//   title: string;
//   width?: number | string;
//   height?: number | string;
//   children: React.ReactNode;
//   paddingTop?: number;
//   paddingBottom?: number;
//   paddingLeft?: number;
//   paddingRight?: number;
// }

// const sizeMap: { [key: string]:any } = {
//   sm: {
//     width: { xs: "100%", sm: "400px" },
//   },
//   md: {
//     width: { xs: "100%", sm: "500px", md: "600px" },
//   },
//   lg: {
//     width: { xs: "100%", sm: "600px", md: "800px", lg: "1200px" },
//   },
// };

// const CustomModal: React.FC<CustomModalProps> = ({
//   open,
//   onClose,
//   title,
//   height,
//   width = "md",
//   paddingTop = { xs: 2, md: 4 },
//   paddingBottom = { xs: 2, md: 4 },
//   paddingLeft = { xs: 2, md: 4 },
//   paddingRight = { xs: 2, md: 4 },
//   children,
// }) => {
//   const theme = useTheme();
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       aria-labelledby="custom-modal-title"
//       sx={{
//         zIndex: theme.zIndex.modal,
//         height: { xs: "100dvh", md: "auto" },
//       }}
//     >
//       <Box
//         onClick={(e: any) => e.stopPropagation()}
//         onMouseDown={(e: any) => e.stopPropagation()}
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "100%",
//           maxWidth: sizeMap[width]?.width || sizeMap["md"]?.width,
//           bgcolor: '#222222ff',
//           borderRadius: 1,
//           boxShadow: "0 0 5px rgba(255, 255, 255, 0.1)",
//           display: "flex",
//           flexDirection: "column",
//           gap: 3,
//           justifyContent: "space-between",
//           height: height ?? "auto",
//           maxHeight: "90dvh",
//           overflow: "scroll",
//           scrollbarWidth: "none",
//           pb: { xs: 3, md: 0 },
//           "&::-webkit-scrollbar": {
//             display: "none",
//           },
//         }}
//       >
//         <Grow in={!!open} timeout={500}>
//           <Box>
//             <Box
//               component="div"
//               textAlign="center"
//               py={3}
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 paddingLeft: 3,
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Typography variant="h4">{title}</Typography>
//             </Box>
//             <IconButton
//               onClick={(e: any) => {
//                 e.stopPropagation();
//                 // forward the original click event to the onClose handler so callers
//                 // that call e.stopPropagation() won't crash when receiving an empty object
//                 onClose && onClose(e, "escapeKeyDown");
//               }}
//               sx={{
//                 position: "absolute",
//                 top: 20,
//                 right: 20,
//                 color: "#fff",
//                 backgroundColor: "rgba(0,0,0,0.2)",
//                 "&:hover": {
//                   backgroundColor: "rgba(0,0,0,0.4)",
//                 },
//               }}
//               size="small"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Box
//               sx={{
//                 pt: paddingTop,
//                 pb: paddingBottom,
//                 pl: paddingLeft,
//                 pr: paddingRight,
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 height: "-webkit-fill-available",
//                 gap: 3,
//                 width: "100%",
//               }}
//             >
//               {children}
//             </Box>
//           </Box>
//         </Grow>
//       </Box>
//     </Modal>
//   );
// };

// export default CustomModal;
