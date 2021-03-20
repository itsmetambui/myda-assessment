import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Autocomplete, {
  AutocompleteCloseReason,
} from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    fontSize: 13,
  },
  button: {
    fontSize: 13,
    width: "100%",
    textAlign: "left",
    paddingBottom: 8,
    color: "#586069",
    fontWeight: 600,
    "&:hover,&:focus": {
      color: "#0366d6",
    },
    "& span": {
      width: "100%",
    },
    "& svg": {
      width: 16,
      height: 16,
    },
    borderBottom: 1,
  },
  tag: {
    marginTop: 3,
    height: 20,
    padding: ".15em 4px",
    fontWeight: 600,
    lineHeight: "15px",
    borderRadius: 2,
  },
  popper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: "0 3px 12px rgba(27,31,35,.15)",
    borderRadius: 3,
    width: 300,
    zIndex: 1,
    fontSize: 13,
    color: "#586069",
    backgroundColor: "#f6f8fa",
  },
  header: {
    borderBottom: "1px solid #e1e4e8",
    padding: "8px 10px",
    fontWeight: 600,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBase: {
    padding: 10,
    width: "100%",
    borderBottom: "1px solid #dfe2e5",
    "& input": {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      border: "1px solid #ced4da",
      fontSize: 14,
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13,
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
  iconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2,
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
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18,
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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
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
    <React.Fragment>
      <div className={classes.root}>
        <ButtonBase
          disableRipple
          className={classes.button}
          aria-describedby={id}
          onClick={handleClick}
        >
          <span>{store?.name}</span>
          <KeyboardArrowDownIcon />
        </ButtonBase>
      </div>
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
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <span>Select business</span>
            </>
          ) : (
            <>
              <span>{business.name}</span>
              <ButtonBase disableRipple onClick={handleBusinessPickerMode}>
                Change
              </ButtonBase>
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
                <div className={classes.text}>{option.name}</div>
              </React.Fragment>
            )}
            options={business.stores}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
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
              <React.Fragment>
                <div className={classes.text}>{option.name}</div>
              </React.Fragment>
            )}
            options={businesses}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <InputBase
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
              />
            )}
          />
        )}
      </Popper>
    </React.Fragment>
  );
}

const businesses: Business[] = [
  {
    name: "Bubble Tea Pte Ltd (SG4343434)",
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
    name: "Cafe Nero Plc (GB78437434)",
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
    name: "Londis London Ltd (GB483943444)",
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
    name: "The Coffee Company (GB4039843)",
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
