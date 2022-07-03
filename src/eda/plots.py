from itertools import product
import pandas as pd
import numpy as np


def histogram_values(column: pd.Series, **kwargs) -> dict:
    check_nans = np.isnan(column)
    if check_nans.any():
        histogram = np.histogram(column[~check_nans], **kwargs)
    else:
        histogram = np.histogram(column, **kwargs)
    return {"distribution": {"x": list(histogram[1][:-1]), "y": list(histogram[0])}}


def frequency_values(column: pd.Series) -> dict:
    value_counts = column.value_counts()
    value_counts_top5 = value_counts[: 5]
    frequency_dict = value_counts_top5.to_dict()

    if len(value_counts) >= 5:
        value_sum = value_counts.sum()
        remainder = value_sum - value_counts_top5.sum()
        frequency_dict['other'] = remainder

    return {"distribution": {"x": list(frequency_dict.keys()), "y": list(frequency_dict.values())}}


def dtype_for_plot(summary: dict, dtype: str):
    return [i for i in summary if summary[i]["mapped_dtype"] == dtype]


def scatterplot_data(df: pd.DataFrame, summary: dict) -> dict:
    numeric_vars = dtype_for_plot(summary, "numeric")

    df = df[numeric_vars].dropna()

    return {"scatterplot_data": {numeric_var: df[numeric_var].to_list() for numeric_var in numeric_vars}}


def box_plot_data(df: pd.DataFrame, summary: dict) -> dict:
    numeric_vars = dtype_for_plot(summary, "numeric")
    categorical_vars = dtype_for_plot(summary, "categorical")

    IGNORE_IF_GREATER_THAN = 10
    boxplot = {}

    for num, cat in list(product(numeric_vars, categorical_vars)):
        cats = list(df[cat].unique())
        if len(cats) < IGNORE_IF_GREATER_THAN:
            container = [cats]
            for k in cats:
                data = df.loc[df[cat] == k, num]
                container.append(list(data))
            boxplot[num] = container

    return boxplot





