export interface ICurrentValues {
    /**
     * Date on which data was collected by The COVID Tracking Project.
     */
    date: number;
    /**
     * @deprecated Deprecated. This is an old label for lastUpdateEt.
     */
    dateChecked: string;
    /**
     * Total fatalities with confirmed OR probable COVID-19 case diagnosis (per the expanded CSTE case definition of April 5th, 2020 approved by the CDC). In states where the information is available, it only tracks fatalities with confirmed OR probable COVID-19 case diagnosis where COVID-19 is an underlying cause of death according to the death certificate based on WHO guidelines.
     * @returns null if no data is available
     */
    death: number | null;
    /**
     * Increase in death computed by subtracting the value of death for the previous day from the value of death for the current day.
     * @returns null if no data is available
     */
    deathIncrease: number | null;
    /**
     * A hash for this record
     */
    hash: string;
    /**
     * @deprecated Deprecated. Old label for hospitalizedCumulative.
     * @returns null if no data is available
     */
    hospitalized: number | null;
    /**
     * Total number of individuals who have ever been hospitalized with COVID-19. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.
     * @returns null if no data is available
     */
    hospitalizedCumulative: number | null;
    /**
     * Individuals who are currently hospitalized with COVID-19. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.
     * @returns null if no data is available
     */
    hospitalizedCurrently: number | null;
    /**
     * Increase in hospitalizedCumulative computed by subtracting the value of hospitalizedCumulative for the previous day from the value of hospitalizedCumulative for the current day.
     * @returns null if no data is available
     */
    hospitalizedIncrease: number | null;
    /**
     * Total number of individuals who have ever been hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.
     * @returns null if no data is available
     */
    inIcuCumulative: number | null;
    /**
     * Individuals who are currently hospitalized in the Intensive Care Unit with COVID-19. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.
     * @returns null if no data is available
     */
    inIcuCurrently: number | null;
    /**
     * @deprecated Deprecated. Old label for lastUpdateET.
     */
    lastModified: string;
    /**
     * Individuals with a completed viral test that returned a negative result. For states / territories that do not report this number directly, we compute it using one of several methods, depending on which data points the state provides.
     * @returns null if no data is available
     */
    negative: number | null;
    /**
     * Increase in negative computed by subtracting the value of negative for the previous day from the value for negative from the current day.
     * @returns null if no data is available
     */
    negativeIncrease: number | null;
    /**
     * Total number of individuals who have ever been hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.
     * @returns null if no data is available
     */
    onVentilatorCumulative: number | null;
    /**
     * Individuals who are currently hospitalized under advanced ventilation with COVID-19. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.
     * @returns null if no data is available
     */
    onVentilatorCurrently: number | null;
    /**
     * Tests whose results have not yet been reported.
     * @returns null if no data is available
     */
    pending: number | null;
    /**
     * @deprecated Deprecated. Computed by adding positive and negative values.
     * @returns null if no data is available
     */
    posNeg: number | null;
    /**
     * Individuals with confirmed or probable COVID-19 per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.
     * @returns null
     */
    positive: number | null;
    /**
     * Increase in positive computed by subtracting the value of positive from the previous day from the value of positive for the current day.
     * @returns null if no data is available
     */
    positiveIncrease: number | null;
    /**
     * Individuals who have recovered from COVID-19. Definitions vary by state / territory.
     * @returns null if no data is available
     */
    recovered: number | null;
    /**
     * Number of states and territories included in the US dataset for this day.
     */
    states: number;
    /**
     * @deprecated Deprecated. Computed by adding positive, negative, and pending values.
     * @returns null if no data is available
     */
    total: number | null;
    /**
     * Computed by adding positive and negative values to work around reporting lags between positives and total tests and because some states do not report totals.
     * @returns null if no data is available
     */
    totalTestResults: number | null;
    /**
     * @deprecated Deprecated. Increase in totalTestResults computed by subtracting the value of totalTestResults for the previous day from the value of totalTestResults for the current day.
     * @returns null if no data is available
     */
    totalTestResultsIncrease: number | null;
}
