from math import e
import pandas as pd
import numpy as np


def numeric_statistics(column: pd.Series) -> dict:
    _min = column.min()
    _max = column.max()
    q25 = np.nanpercentile(column, 25)
    q75 = np.nanpercentile(column, 75)
    return {"stats":
            {"mean": round(float(column.mean()), 2),
             "variance": round(float(column.var()), 2),
             "std": round(float(column.std()), 2),
             "min": round(float(_min), 2),
             "Q25": round(float(q25), 2),
             "median": round(float(column.median()), 2),
             "Q75": round(float(q75), 2),
             "max": round(float(_max), 2),
             "range": round(float(_max - _min), 2),
             "IQR": round(float(q75 - q25), 2),
             "skew": round(float(column.skew()), 2),
             "kurtosis": round(float(column.kurt()), 2),
             "sum": round(float(np.sum(column)), 2)
             }}


def entropy(column: pd.Series) -> float:
    try:
        _, counts = np.unique(column, return_counts=True)
        probabilities = counts/counts.sum()
    except TypeError:
        counts = column.value_counts()
        probabilities = list(counts/counts.sum())

    return round(float(-(probabilities * np.log(probabilities)).sum()), 3)


def categorical_statistics(column: pd.Series) -> dict:

    try:
        mode = int(column.mode()[0])
    except ValueError:
        mode = column.mode()[0]

    return {"stats":
                     {"mode": mode,
                      "entropy": entropy(column)}}
