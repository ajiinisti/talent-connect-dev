import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import Layout from "../../components/layout/Layout"
import SearchBar from "../../components/searchbar/Searchbar"

const ProgramList = () => {
    return(
        <div className="container">
            <SearchBar/>
            <div className="mt-4">
                <Button title={"Add Program"}/>
            </div>
            <div style={{ marginTop: "1.5rem" }}> {/* Tambahkan properti style pada Card yang ingin diberikan margin top */}
              <Card/>
            </div>
            <Card/>
            <Card/>
        </div>
    )
}

export default Layout(ProgramList)