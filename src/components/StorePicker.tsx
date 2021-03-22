import React from "react";
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

type Store = {
  name: string;
  type: string;
};

type Business = {
  name: string;
  stores: Store[];
};

type PickerMode = "store" | "business";

export default function StorePicker() {
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

  const open = Boolean(anchorEl);
  const id = open ? "store-picker" : undefined;

  return (
    <>
      {/* <ClickAwayListener onClickAway={() => setAnchorEl(null)}> */}
      <ClickAwayListener onClickAway={() => {}}>
        <Button
          disableRipple
          aria-describedby={id}
          onClick={togglePicker}
          className={classes.pickerButton}
          endIcon={
            anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
          }
          classes={{
            label: classes.pickerButtonLabel,
          }}
        >
          {store?.name}
        </Button>
      </ClickAwayListener>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <div className={classes.header}>
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
        </div>
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
            onChange={(event, newValue) => {
              setStore(newValue!);
            }}
            disablePortal
            renderTags={() => null}
            noOptionsText="No labels"
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <div className={classes.text}>
                  <LocationOnIcon fontSize="small" style={{ marginRight: 4 }} />
                  {option.name}
                </div>
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
            onChange={(event, newValue) => {
              setBusiness(newValue!);
              setStore(newValue?.stores[0]!);
              setPickerMode("store");
            }}
            disablePortal
            renderTags={() => null}
            noOptionsText="No labels"
            renderOption={(option, { selected }) => (
              <div className={classes.text}>
                <LocationOnIcon fontSize="small" style={{ marginRight: 4 }} />
                {option.name}
              </div>
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
      </Popper>
    </>
  );
}

const businesses: Business[] = [
  {
    name: "Bubble Tea Pte Ltd",
    stores: [
      { name: "All Stores (The Coffee Company Estate)", type: "store" },
      { name: "London Region", type: "store" },
      { name: "Paddington", type: "store" },
      { name: "Oxford Street", type: "store" },
      { name: "Midlands Region", type: "store" },
      { name: "Bullring", type: "store" },
      { name: "Leicester", type: "store" },
      { name: "Central belt warehouse", type: "warehouse" },
      { name: "Main distribution centre", type: "warehouse" },
    ],
  },
  {
    name: "Cafe Nero Plc",
    stores: [
      { name: "All Stores (Cafe Nero Plc (GB78437434))", type: "store" },
      { name: "Everton Region", type: "store" },
      { name: "Oxford Street", type: "store" },
      { name: "Midlands Region", type: "store" },
      { name: "London Region", type: "store" },
      { name: "Central belt warehouse", type: "warehouse" },
      { name: "Main distribution centre", type: "warehouse" },
    ],
  },
  {
    name: "Fatboys UK Ltd (GB7878344)",
    stores: [
      { name: "All Stores (Fatboys UK Ltd (GB7878344))", type: "store" },
      { name: "London Region", type: "store" },
      { name: "US Street", type: "store" },
      { name: "Midlands Region", type: "store" },
      { name: "Manchester", type: "store" },
      { name: "Main distribution centre", type: "warehouse" },
    ],
  },
  {
    name: "Londis London Ltd",
    stores: [
      { name: "All Stores (Londis London Ltd (GB483943444))", type: "store" },
      { name: "London Region", type: "store" },
      { name: "US Street", type: "store" },
      { name: "Midlands Region", type: "store" },
      { name: "Manchester", type: "store" },
      { name: "Main distribution centre", type: "warehouse" },
    ],
  },
  {
    name: "The Coffee Company",
    stores: [
      { name: "All Stores (The Coffee Company (GB4039843))", type: "store" },
      { name: "London Region", type: "store" },
      { name: "US Street", type: "store" },
      { name: "Midlands Region", type: "store" },
      { name: "Manchester", type: "store" },
      { name: "Main distribution centre", type: "warehouse" },
    ],
  },
];
