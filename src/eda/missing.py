import pandas as pd
import numpy as np


def calculate_missing_values(df, shape):
    missing = {}
    length = shape[1]

    for column in df:
        missing_count = df[column].isna().sum()
        missing[column] = {"count": missing_count, "proportion": 0 if length == 0 else missing_count/length}

    return missing


def df_level_missing_values(missing_dict, shape):
    counts = np.array([v['count'] for k, v in missing_dict.items()])
    missing_cells = np.sum(counts)
    missing_cells_prop = missing_cells/(shape[0]*shape[1])
    vars_with_missing = np.sum(counts > 0.0)

    return missing_cells, missing_cells_prop, vars_with_missing


def missing_plot(missing):
    missing_counts = {column: value["count"] for column, value in missing.items()}
    pass
