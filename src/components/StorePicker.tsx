import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete, {
  AutocompleteCloseReason,
} from "@material-ui/lab/Autocomplete";
import {
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pickerButton: {
    minWidth: theme.spacing(40),
    borderRadius: "unset",
    textTransform: "none",
    "&:focus": {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  pickerButtonLabel: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
  },
  popper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    width: 300,
    zIndex: 1,
    backgroundColor: "white",
    marginTop: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  header: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    fontWeight: 600,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F6F7",
  },
  searchInputWrapper: {
    width: "100%",
  },
  searchInput: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    fontSize: 13,
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13,
    paddingTop: theme.spacing(0.5),
  },
  groupLabel: {
    textTransform: "lowercase",
    fontWeight: 600,
    "&::first-letter": {
      textTransform: "uppercase",
    },
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent",
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  popperDisablePortal: {
    position: "relative",
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2,
  },
  text: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
  },
}));

type PickerMode = "store" | "business";

const StorePicker: FC<{ businesses: Business[] }> = ({ businesses }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const [pickerMode, setPickerMode] = React.useState<PickerMode>("store");

  const [business, setBusiness] = React.useState<Business>(businesses[0]);
  const [store, setStore] = React.useState<Store | null>(business.stores[0]);

  const togglePicker = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === "toggleInput") {
      return;
    }
    if (anchorEl) {
      anchorEl.focus();
    }
  };

  const handleBusinessPickerMode = () => {
    setPickerMode("business");
  };

  const handleStorePickerMode = () => {
    setPickerMode("store");
  };

  const handleStoreChange = (
    event: React.ChangeEvent<{}>,
    value: Store | null
  ) => {
    setStore(value);
    setAnchorEl(null);
  };

  const handleBusinessChange = (
    event: React.ChangeEvent<{}>,
    value: Business | null
  ) => {
    setBusiness(value!);
    setStore(value?.stores[0]!);
    setPickerMode("store");
  };

  const open = Boolean(anchorEl);
  const id = open ? "store-picker" : undefined;

  return (
    <>
      <Button
        disableRipple
        aria-describedby={id}
        onClick={togglePicker}
        className={classes.pickerButton}
        endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        classes={{
          label: classes.pickerButtonLabel,
        }}
      >
        {store?.name}
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Box>
            <Box className={classes.header}>
              {pickerMode === "business" ? (
                <>
                  <IconButton
                    aria-label="back-to-store-selection"
                    onClick={handleStorePickerMode}
                    size="small"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography
                    variant="body2"
                    style={{
                      fontWeight: 600,
                      margin: "auto",
                      transform: "translateX(-15px)",
                    }}
                  >
                    Select business
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" style={{ fontWeight: 600 }}>
                    {business.name}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    disableRipple
                    onClick={handleBusinessPickerMode}
                    style={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Change
                  </Button>
                </>
              )}
            </Box>
            {pickerMode === "store" ? (
              <Autocomplete
                open
                onClose={handleClose}
                classes={{
                  paper: classes.paper,
                  option: classes.option,
                  popperDisablePortal: classes.popperDisablePortal,
                  groupLabel: classes.groupLabel,
                }}
                value={store}
                onChange={handleStoreChange}
                disablePortal
                renderTags={() => null}
                noOptionsText="No labels"
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Box className={classes.text}>
                      <LocationOnIcon
                        fontSize="small"
                        style={{ marginRight: 4 }}
                      />
                      {option.name}
                    </Box>
                  </React.Fragment>
                )}
                options={business.stores}
                groupBy={(option) => option.type}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    autoFocus
                    InputProps={{
                      className: classes.searchInput,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" color="disabled" />
                        </InputAdornment>
                      ),
                    }}
                    className={classes.searchInputWrapper}
                  />
                )}
              />
            ) : (
              <Autocomplete
                open
                onClose={handleClose}
                classes={{
                  paper: classes.paper,
                  option: classes.option,
                  popperDisablePortal: classes.popperDisablePortal,
                }}
                value={business}
                onChange={handleBusinessChange}
                disablePortal
                renderTags={() => null}
                noOptionsText="No labels"
                renderOption={(option, { selected }) => (
                  <Box className={classes.text}>
                    <LocationOnIcon
                      fontSize="small"
                      style={{ marginRight: 4 }}
                    />
                    {option.name}
                  </Box>
                )}
                options={businesses}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    autoFocus
                    InputProps={{
                      className: classes.searchInput,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" color="disabled" />
                        </InputAdornment>
                      ),
                    }}
                    className={classes.searchInputWrapper}
                  />
                )}
              />
            )}
          </Box>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default StorePicker;
