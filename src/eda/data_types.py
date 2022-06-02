from collections import defaultdict
import pandas as pd


def get_data_types(df: pd.DataFrame, categorical_threshold=10) -> dict:

    dtype_map = {"object": "categorical",
                 "int64": "numeric",
                 "float64": "numeric",
                 "bool": "categorical",
                 "datetime64": "date/ time",
                 "timedelta[ns]": "date/ time",
                 "category": "categorical"}

    dtype_info = {}

    for column in df:
        pd_dtype = str(df[column].dtypes)
        if pd_dtype in ["int64", "float64"] and df[column].nunique() <= categorical_threshold:
            mapped_dtype = "categorical"
        else:
            mapped_dtype = dtype_map.get(pd_dtype, "unknown")

        dtype_info[column] = {"original_dtype": pd_dtype, "mapped_dtype": mapped_dtype}

    return {"data_types": dtype_info}


def count_data_types(d_type_dict: dict) -> dict:
    dtype_counts = {}

    for k, v in d_type_dict["data_types"].items():
        d_type = v["mapped_dtype"]
        if d_type in dtype_counts:
            dtype_counts[d_type] += 1
        else:
            dtype_counts[d_type] = 1

    return dtype_counts