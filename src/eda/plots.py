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


