import pandas as pd


def get_duplicates(df: pd.DataFrame, n_rows: int) -> dict:
    num_duplicates = int(df.duplicated().sum())

    return {"duplicates": {"count": num_duplicates,
                                        "proportion": num_duplicates / n_rows}}
