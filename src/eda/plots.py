import pandas as pd
import numpy as np


def histogram_values(column: pd.Series, **kwargs) -> dict:
    check_nans = np.isnan(column)
    if check_nans.any():
        histogram = np.histogram(column[~check_nans], **kwargs)
    else:
        histogram = np.histogram(column, **kwargs)
    return {"distribution": {"x": histogram[1], "y": histogram[0]}}


def frequency_values(column: pd.Series) -> dict:
    value_counts = column.value_counts().to_dict()
    return {"distribution": {"x": list(value_counts.keys()), "y": list(value_counts.values())}}


