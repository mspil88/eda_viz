import pandas as pd


def calculate_missing_values(df, shape):
    missing = {}

    for column in df:
        missing_count = df[column].isna().sum()
        missing[column] = {"count": missing_count, "proportion": missing_count/shape[1]}

    return missing