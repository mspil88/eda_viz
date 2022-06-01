import pandas as pd
import numpy as np


def numeric_statistics(column: pd.Series):
    _min = column.min()
    _max = column.max()
    q25 = np.nanpercentile(column, 25)
    q75 = np.nanpercentile(column, 75)
    return {"stats":
            {"mean": column.mean(),
             "variance": column.var(),
             "std": column.std(),
             "min": _min,
             "Q25": q25,
             "median": column.median(),
             "Q75": q75,
             "max": _max,
             "range": _max - _min,
             "IQR": q75 - q25,
             "skew": column.skew(),
             "kurtosis": column.kurt(),
             "sum": np.sum(column)
             }}


def categorical_statistics(column: pd.Series):
    return {"stats":
                     {"mode": column.mode[0]}}
