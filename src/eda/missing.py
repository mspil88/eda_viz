import pandas as pd
import numpy as np


def calculate_missing_values(df: pd.DataFrame, shape: tuple) -> dict:
    missing = {}
    length = shape[1]

    for column in df:
        missing_count = df[column].isna().sum()
        missing[column] = {"count": missing_count, "proportion": 0 if length == 0 else missing_count/length}

    return missing


def df_level_missing_values(missing_dict: dict, shape: tuple) -> dict:
    counts = np.array([v['count'] for k, v in missing_dict.items()])
    missing_cells = np.sum(counts)
    missing_cells_prop = missing_cells/(shape[0]*shape[1])
    vars_with_missing = np.sum(counts > 0.0)

    return {"overview": {"missing_cells": missing_cells, "missing_proportion": missing_cells_prop,
                         "variables_with_missing": vars_with_missing}}


def reformat_missing(missing_dict: dict) -> list:
    return [{k: {"missing": v}} for k, v in missing_dict.items()]


def missing_plot(missing):
    missing_counts = {column: value["count"] for column, value in missing.items() if value["count"] > 0.0}
    pass
