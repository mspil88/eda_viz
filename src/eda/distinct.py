from typing import Dict
import pandas as pd
import numpy as np


def count_distinct(column: pd.Series) -> Dict:
    distinct_values = column.nunique()

    return {"distinct": {"count": distinct_values,
                         "proportion": distinct_values/len(column)}}

def count_zero_values(column: pd.Series) -> Dict:
    num_zero = np.array(column == 0)

    return {"zeros": {"count": np.sum(num_zero),
                      "proportion": num_zero/len(num_zero)}}
