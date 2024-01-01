import { test, expect } from "@playwright/test";
// import { mockMap, searchByColName, searchByIndex } from '../data/MockedData';
import { MOCKHistory } from "../src/components/MOCKHistory";


// Before each test, runs the page through the local host port and clicks into the command input box
test.beforeEach(async ({ page }) => {
  page.goto("http://localhost:8000/");
  page.getByLabel("Command input").click();
});

// Tests that the CSV file is loaded into the website and that the output appropriately says
// that the file has been loaded with/out headers
test("csv file loads after load_file command is entered,", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithHeader.csv true");
  const mock_input = "load_file dataWithHeader.csv true";
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);

  await page.getByRole("button").click();
  const mock_display = "Output: loaded dataWithHeader.csv with headers";
  await expect(page.getByLabel("history-element")).toHaveText(mock_display);
});

// Tests that a blank data message is displayed after the user tries to view an empty CSV file
test("blank data message is displayed after empty csv file is loaded", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file blankDataset.csv false");
  await page.getByRole("button").click();
  const mock_display1 = "Output: loaded blankDataset.csv without headers";
  await expect(page.getByLabel("history-element")).toContainText(mock_display1);

  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  const mock_display2 = "Output: blank CSV inputted";
  await expect(page.getByLabel("history-element")).toContainText(mock_display2);
});

// Tests that the user can't try to view a CSV if no CSV has been loaded onto the page yet
test("no CSV loaded message if no CSV was inputted", async ({ page }) => {
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  const mock_display = "Output: no CSV loaded";
  await expect(page.getByLabel("history-element")).toContainText(mock_display);
});

// Tests that the CSV information displayed in the history box is changed to a different set of
// CSV info if a new file is loaded
test("CSV info changes if new CSV is loaded after an initial file", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithHeader.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Native American/American Indian");

  await page.getByLabel("Command input").fill("load_file smallDataset.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Native American/American Indian");
  await expect(page.getByLabel("history-element")).toContainText("Broccoli");
});

// Tests that an error message about an invalid filepath is displayed if the filepath is not 
// an accurate CSV
test("error message is displayed after inaccurate csv file is loaded", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file typoDataset.csv true");
  await page.getByRole("button").click();
  const mock_display = "load CSV filepath not valid (case-sensitive)";
  await expect(page.getByLabel("history-element")).toContainText(mock_display); 
});

// Tests that an error message is displayed if the hasHeader input is not written exactly
// as "true" or "false"
test("error message is displayed after inaccurate header command is input", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithHeader.csv troo");
  await page.getByRole("button").click();
  const mock_display = "CSV header command is not valid (case-sensitive)";
  await expect(page.getByLabel("history-element")).toContainText(mock_display); 
});

// Tests that the user receives a message about the CSV file not having a header row
test("notified that CSV doesn't have headers after loading a header-less file", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithoutHeader.csv false");
  await page.getByRole("button").click();
  const mock_display = "Output: loaded dataWithoutHeader.csv without headers";
  await expect(page.getByLabel("history-element")).toContainText(mock_display); 
});

// Tests that the history contains a data table of the CSV data once view is clicked
test("CSV is displayed as a data table after inputting view command", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithHeader.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("0.45"); 
  await expect(page.getByLabel("history-element")).toContainText("74596.18851"); 
  await expect(page.getByLabel("history-element")).toContainText("Employed Percent"); 
})
 
// Tests that the search command returns a data table that contains all the rows where the 
// search term exists within the search column parameters
test("search command results in multiple result rows", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file smallDataset.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("search Fruits Mango");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Ben"); 
  await expect(page.getByLabel("history-element")).not.toContainText("Apple"); 
});

// Tests that a notification is displayed when there are no resulting rows from a search
test("search contains no resulting rows", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file smallDataset.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("search Name Lucy");
  await page.getByRole("button").click();
  const mock_display = "no results associated with the given search term or parameters";
  await expect(page.getByLabel("history-element")).toContainText(mock_display);
});

// Tests that the user can search the CSV for a search term using the index as a search parameter
test("search by index", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file smallDataset.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("search 1 Mango");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Eggplant"); 
  await expect(page.getByLabel("history-element")).not.toContainText("Apple");
});

// Tests that the history changes from brief to verbose mode and details what the inputted commands
// were for each of the previous inputs
test("command input is displayed in history when switched to verbose mode", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithHeader.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("search 2 $770.26");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Command: mode verbose");
  await expect(page.getByLabel("history-element")).toContainText("Command: load_file dataWithHeader.csv true");
  await expect(page.getByLabel("history-element")).toContainText("Command: search 2 $770.26");
  await expect(page.getByLabel("history-element")).toContainText("Command: view");
});

// Tests that the command input is displayed and removed when switching between verbose and brief mode
test("command input is displayed / removed when switching between verbose / brief mode", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithHeader.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("search 2 $770.26");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Command: mode verbose");
  await expect(page.getByLabel("history-element")).toContainText("Command: load_file dataWithHeader.csv true");

  await page.getByLabel("Command input").fill("mode brief");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).not.toContainText("Command: mode brief"); 
  await expect(page.getByLabel("history-element")).toContainText("30424.80376");

  await page.getByLabel("Command input").fill("mode verbose");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Command: mode brief"); 
});

// Tests that the search response changes when no CSV is loaded versus when the CSV is loaded
// and the same search command is input
test("search response changes after loading a CSV", async ({ page }) => {
  await page.getByLabel("Command input").fill("search 1 Mango");
  await page.getByRole("button").click();
  await expect(page.getByLabel("history-element")).toContainText("Output: no CSV loaded"); 
  await page.getByLabel("Command input").fill("load_file smallDataset.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("search 1 Mango");
  await page.getByRole("button").click();

  await expect(page.getByLabel("history-element")).toContainText("Ben"); 
  await expect(page.getByLabel("history-element")).toContainText("Eggplant"); 
  await expect(page.getByLabel("history-element")).toContainText("Mango"); 
})

// Tests that the program can search for multiple search terms on the same CSV and display
// these results in the history 
test("multiple searches for the CSV", async ({ page }) => {
  await page.getByLabel("Command input").fill("load_file dataWithHeader.csv true");
  await page.getByRole("button").click();
  await page.getByLabel("Command input").fill("search 2 $770.26");
  await page.getByRole("button").click();
  await expect(page.getByLabel("history-element")).toContainText("$0.73"); 
  await expect(page.getByLabel("history-element")).not.toContainText("$1.00"); 

  await page.getByLabel("Command input").fill("search 0 RI");
  await page.getByRole("button").click();
  await expect(page.getByLabel("history-element")).toContainText("$1.00"); 
  await expect(page.getByLabel("history-element")).toContainText("Multiracial"); 
})

