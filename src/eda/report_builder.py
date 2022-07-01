import pandas as pd
from report import NumericVariableReport, CategoricalVariableReport, OverviewReport


def build_report(df: pd.DataFrame):

    overview = OverviewReport()
    overview_summary = overview.generate_summary(df)
    data_type_mapping = overview.variable_type_mapping["data_types"]

    summary_container = [overview_summary]

    for key, value in data_type_mapping.items():
        if value['mapped_dtype'] == "numeric":
            summary_container.append(NumericVariableReport(key).generate_summary(df[key]))
        elif value['mapped_dtype'] == "categorical":
            summary_container.append(CategoricalVariableReport(key).generate_summary(df[key]))

    print(f"overview dtypes {overview.variable_type_mapping['data_types']}")

    return summary_container