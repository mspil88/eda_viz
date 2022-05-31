import pandas as pd
import numpy as np


def count_distinct(column: pd.Series, column_name: str) -> dict:
    distinct_values = column.nunique()

    return {column_name:
                {"distinct": {"count": distinct_values,
                              "proportion": distinct_values / len(column)}}}


def count_zero_values(column: pd.Series, column_name: str) -> dict:
    num_zero = np.array(column == 0)

    return {column_name:
                {"zeros": {"count": np.sum(num_zero),
                           "proportion": num_zero / len(num_zero)}}}
