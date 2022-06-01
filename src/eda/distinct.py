import pandas as pd
import numpy as np


def count_distinct(column: pd.Series) -> dict:
    distinct_values = column.nunique()

    return {"distinct": {"count": distinct_values,
                              "proportion": distinct_values / len(column)}}


def count_zero_values(column: pd.Series) -> dict:
    num_zero = np.sum(np.array(column == 0))

    return {"zeros": {"count": num_zero,
                           "proportion": num_zero / len(column)}}


