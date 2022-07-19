import pandas as pd
import numpy as np


def count_distinct(column: pd.Series) -> dict:
    distinct_values = column.nunique()

    return {"distinct": {"count": int(distinct_values),
                              "proportion": float(distinct_values / len(column))}}


def count_zero_values(column: pd.Series) -> dict:
    num_zero = np.sum(np.array(column == 0))

    return {"zeros": {"count": int(num_zero),
                           "proportion": float(num_zero / len(column))}}


