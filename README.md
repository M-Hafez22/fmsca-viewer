# FMSCA Viewer

> [Live Preview](https://m-hafez22.github.io/fmsca-viewer/)

## Project Description

The Federal Motor Carrier Safety Administration (FMCSA) is an agency within the United States Department of Transportation that regulates the trucking industry in the United States. This project, FMSCA Viewer, provides a centralized view of FMCSA data, which includes multiple parameters for trucking companies such as MC, DOT, Carrier/Broker/Shipper, Inspections, etc.

### How it works

The FMCSA Viewer project is designed to provide a user-friendly interface for accessing and viewing FMCSA data. It allows users to search, filter, and view FMCSA data in a tabular format.

The FMSCA Viewer project addresses this problem by:

- Creating a viewer to display FMCSA data.
- Using a table format for data presentation.
- Implementing pagination to manage large datasets.
- Adding column filters for customizable data viewing.

### Columns Included

- Created_DT
- Modified_DT
- Entity
- Operating Status
- Legal Name
- DBA Name
- Physical Address
- Phone
- DOT
- MC/MX/FF
- Power Units
- Out of Service Date

## Installation Instructions

To set up the project locally, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/M-Hafez22/FMSCA_viewer.git
    ```

2. Navigate to the Project Directory

    ```bash
    cd FMSCA_viewer
    ```

3. Install Dependencies

    ```bash
    npm install
    ```

4. Run the Development Server

    ```bash
    npm run dev
    ```

> The app will be available at <http://localhost:3000>.
> Test coverage 100% with jest and RTL

## Notes

- In this example, I can't use all the data in the FMSCA_records (2).xlsx as it's too large to be handled on my machine.
- It is displayed in a Light or Dark theme based on the user's OS theme.
