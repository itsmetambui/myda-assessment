import { Button, ThemeProvider } from "@material-ui/core";
import "./App.css";
import StorePicker from "./components/StorePicker";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Button>Test</Button>
          <StorePicker businesses={businesses} />
        </header>
      </div>
    </ThemeProvider>
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

export default App;
